# API Extraction

## Overview
The approach for extracting data from API is based on a brute-force methodology, where queries are generated lexicographically, and API calls are made sequentially. The results are collected and stored, ensuring that the extraction process adheres to the defined rate limits and result limits.

## Approach
1. **Starting Query:** The extraction process begins with the query "a".
2. **Fetching Data:** The `fetchAPI` function sends a request to `BASE_URL/v2/autocomplete?query=<query>` and retrieves the results.
3. **Handling Rate Limits:** The function ensures that the number of requests does not exceed the predefined rate limit of each version by delaying the fetch by (1min/number of calls allowed).
4. **Result Processing:**
   - If results are obtained, they are stored in a `Set` to avoid duplicates.
   - The total count of extracted results is updated.
5. **Generating the Next Query:**
   - If the number of results obtained is equal to the `RESULT_LIMITS[version]`, it suggests that there might be more data for the same prefix.
   - The query is then modified to continue lexicographically from the last value obtained in the results.
   - If not, the last character in the query string is incremented lexicographically.
6. **Loop Until Completion:** The process continues until all lexicographic possibilities are exhausted or no new data is found.
7. For versions v2 and v3 consideration of numbers is also made where after the cycle runs for alphabets a seperate cycle runs for queries starting with numbers.

## Example Flow
1. Start with `query = "a"`.
2. Fetch results using `fetchAPI("v2", "a")`.
3. If MAX results are obtained, reuse the prefix to get more data.
4. If fewer results are obtained, generate the next query lexicographically (e.g., `b`, `c`, ..., `z`).
5. Repeat the process until all queries are exhausted.

## Limitations
- **Brute-force nature**: The approach generates queries in order without prior knowledge of actual data distribution , therefore this takes a lot of time to extract all the data.
- **API Rate Limitations**: The extraction process slows down due to enforced delays to comply with rate limits.
- **Query Redundancy**: Some queries might return overlapping results, leading to redundant checks.

## Summary
This brute-force approach ensures exhaustive extraction but comes at the cost of efficiency. By iterating lexicographically and adjusting queries based on result limits, it maximizes data retrieval while respecting API constraints.

