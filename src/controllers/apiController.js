const axios = require("axios");

const BASE_URL = "http://35.200.185.69:8000";
// const VERSIONS = ["v1", "v2", "v3"];
const VERSIONS = ["v2"];

const RATE_LIMITS = { v1: 100, v2: 50, v3: 80 };
const RESULT_LIMITS = { v1: 10, v2: 12, v3: 15 };

const extractedData = { v1: new Set(), v2: new Set(), v3: new Set() };
const requestCount = { v1: 0, v2: 0, v3: 0 };
const resultCount = { v1: 0, v2: 0, v3: 0 };

let prevResultLength = 0;
let prevQuery = "";

// Delay function to make sure that the rate limit does not exceed - for respective versions of the APi
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch funciton to extract the data for current query and version
const fetchAPI = async (version, query) => {
	console.log(
		`Fetching ${version} => Query: ${query} (Count: ${requestCount[
			version
		]++}) `
	);
	console.log(resultCount);

	try {
		const response = await axios.get(
			`${BASE_URL}/${version}/autocomplete?query=${query}`
		);

		// storign the length of the current response - to facillitate the generation of the next query
		prevResultLength = response.data.count;

		return response.data.results;
	} catch (error) {
		// handling errors and rate limits exceeds
		console.error(
			`Error fetching ${version} with query '${query}':`,
			error.response?.data || error.message
		);

		if (
			error.response?.data?.detail?.includes(
				`${RATE_LIMITS[version]} per 1 minute`
			)
		) {
			console.log("Rate limit hit. Waiting 60 seconds before retrying...");
			await delay(60000);
			return fetchAPI(version, query);
		}

		return [];
	}
};

const generateNextQuery = (version, lastQuery) => {
	if (version === "v1") return generateQueryV1(lastQuery);
	if (version === "v2") return generateQueryV2(lastQuery);
	if (version === "v3") return generateQueryV3(lastQuery);
};

const generateQueryV1 = (lastQuery) => {
	// considering only the first three characters to generate the next query
	let prefix = lastQuery.slice(0, 3);
	let chars = prefix.split("");

	console.log("prevQuery - ", prevQuery);
	console.log("prefix - ", prefix);

	// if the length of the previous resonse was equal to the response limit then
	// it may be so that there are more results to be obtained from the same query
	// therefore returning the prefix
	if (
		prevResultLength === RESULT_LIMITS["v1"] &&
		lastQuery.length > 1 &&
		prevQuery !== prefix
	) {
		prevQuery = prefix;
		return prefix;
	}

	// for version 1 only alphabets are involved
	// therefore incrementing in alphabetical order
	// the following if segment takes care of the fact if the last character is "z"
	// eg - [ hzz ---> i ] , [ atz ---> au ] and so on
	if (prefix.endsWith("z") && prefix.length > 1) {
		let query = prefix.split("");
		if (query[query.length - 2] === "z") {
			prevQuery = prefix;
			return String.fromCharCode(query[0].charCodeAt(0) + 1);
		} else {
			query[query.length - 2] = String.fromCharCode(
				query[query.length - 2].charCodeAt(0) + 1
			);
			prevQuery = prefix;
			return query.slice(0, -1).join("");
		}
	}

	// incrementing the last character
	// eg - [ htp --> htq ],  [ db -- dbc ]
	for (let i = chars.length - 1; i >= 0; i--) {
		chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
		prevQuery = prefix;
		return chars.join("");
	}

	// returning null if "zzz" has been reached
	return null;
};

const generateQueryV2 = (lastQuery) => {
	let prefix = lastQuery.slice(0, 3);
	let chars = prefix.split("");

	if (
		prevResultLength === RESULT_LIMITS["v2"] &&
		lastQuery.length > 1 &&
		prefix !== prevQuery
	) {
		prevQuery = prefix;
		return prefix;
	}

	if (!isNaN(lastQuery[0])) {
		prefix = lastQuery.slice(0, 2);
		let chars = prefix.split("");

		if (chars[1] >= "0" && chars[1] < "9") {
			chars[1] = String.fromCharCode(chars[1].charCodeAt(0) + 1);
		} else if (chars[1] === "9") {
			if (chars[0] === "9") {
				prevQuery = prefix;
				return null;
			}
			chars[0] = String.fromCharCode(chars[0].charCodeAt(0) + 1);
		}

		prevQuery = prefix;
		return chars.join("");
	}

	if (prefix.endsWith("z") && prefix.length > 1) {
		let query = prefix.split("");

		if (query[query.length - 2] === "z") {
			if (query[query.length - 3] === "z") {
				prevQuery = prefix;
				return "0";
			}
			prevQuery = prefix;
			return String.fromCharCode(query[0].charCodeAt(0) + 1);
		} else {
			if (query[query.length - 2] === "9") {
				query[query.length - 2] = "a";
				prevQuery = prefix;
				return query.slice(0, -1).join("");
			}
			query[query.length - 2] = String.fromCharCode(
				query[query.length - 2].charCodeAt(0) + 1
			);
			prevQuery = prefix;
			return query.slice(0, -1).join("");
		}
	}

	for (let i = chars.length - 1; i >= 0; i--) {
		if (chars[i] === "9") {
			chars[i] = "a";
			prevQuery = prefix;
			return chars.join("");
		}
		chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
		prevQuery = prefix;
		return chars.join("");
	}

	prevQuery = prefix;
	return null;
};

const generateQueryV3 = (lastQuery) => {
	// removing anything after white spaces
	let prefix = lastQuery.trim().split(/\s+/)[0].slice(0, 3);
	let chars = prefix.split("");

	// same logic as v1
	if (
		prevResultLength === RESULT_LIMITS["v3"] &&
		lastQuery.length > 1 &&
		prefix !== prevQuery
	) {
		prevQuery = prefix;
		return prefix;
	}

	// if the first characters are numbers then the following logic will happen
	if (!isNaN(lastQuery[0])) {
		// taking only first 2 characters
		prefix = prefix.slice(0, 2);
		let chars = prefix.split("");

		if (chars[1] >= "0" && chars[1] < "9") {
			// the following code segment takes care of the following:
			// eg - [ 07 --> 08 ], [ 38 -- > 39]
			chars[1] = String.fromCharCode(chars[1].charCodeAt(0) + 1);
		} else if (chars[1] === "9") {
			// this code segment takes care of cases similar to :
			// eg - [49 ---> 5], [69 ---> 7]
			if (chars[0] === "9") {
				// terminating query generation if "99" has been reached
				prevQuery = prefix;
				return null;
			}

			chars[0] = String.fromCharCode(chars[0].charCodeAt(0) + 1);
			return chars[0];
		}

		// taking care of the case if the second character is not an alphabet or a digit
		if (
			!(chars[1] >= "0" && chars[1] <= "9") &&
			!(chars[1] >= "a" && chars[1] <= "z")
		) {
			chars[1] = "1";
		}

		prevQuery = prefix;
		return chars.join("");
	}

	if (prefix.endsWith("z") && prefix.length > 1) {
		let query = prefix.split("");

		if (query[query.length - 2] === "z") {
			if (query[query.length - 3] === "z") {
				prevQuery = prefix;
				return "0";
			}
			prevQuery = prefix;
			return String.fromCharCode(query[0].charCodeAt(0) + 1);
		} else {
			if (query[query.length - 2] === "9") {
				query[query.length - 2] = "a";
				prevQuery = prefix;
				return query.slice(0, -1).join("");
			}
			query[query.length - 2] = String.fromCharCode(
				query[query.length - 2].charCodeAt(0) + 1
			);
			prevQuery = prefix;
			return query.slice(0, -1).join("");
		}
	}

	// queries staring with alphabets
	for (let i = chars.length - 1; i >= 0; i--) {
		if (chars[i] === "9") {
			chars[i] = "a";
			prevQuery = prefix;
			return chars.join("");
		}
		chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
		prevQuery = prefix;
		return chars.join("");
	}

	prevQuery = prefix;
	return null;
};

const extractAPI = async (req, res) => {
	// running a loop for each version
	// then generating queries according to each version
	for (const version of VERSIONS) {
		extractedData[version] = new Set();
		let query = "a";

		while (query && query <= "zzz") {
			let results = await fetchAPI(version, query);
			console.log("Result - ", results);
			await delay(60000 / RATE_LIMITS[version]);

			if (results.length > 0) {
				// adding extracted data to the results
				for (const result of results) {
					extractedData[version].add(result);
					resultCount[version] = extractedData[version].size;
				}
				// sending the last result of the result obtained for the next query generation
				query = generateNextQuery(
					version,
					results.length > 0 ? results[results.length - 1] : query
				);
			} else {
				query = generateNextQuery(version, query);
			}
		}
	}

	// returning the Extracted data
	console.log("Extraction Completed:", extractedData);
	res.json({
		message: "API extraction successful!",
		extractedData: extractedData,
		requestCount: requestCount,
		RESULT_LIMITS: RESULT_LIMITS,
		resultCount: resultCount,
	});
};

module.exports = { extractAPI };
