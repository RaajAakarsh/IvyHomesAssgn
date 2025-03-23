# Express API Exploration Project

This project is an assignment focused on exploring an API and extracting all possible data without any provided documentation. The goal is to analyze the API, understand its structure, and retrieve relevant information. 

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: v18+)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

### 2️⃣ Installation
Clone the repository and install dependencies:
```bash
# Clone this repository
git clone <repository-url>

# Navigate to the project directory
cd <project-folder>

# Install dependencies
npm install
```

### 3️⃣ Running the Project
You can run the project in development or production mode:
```bash
# Start in development mode
npm run dev

# Start in production mode
npm run start
```

## 📌 Environment Variables (.env)
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
AUTOCOMPLETE_API=http://35.200.185.69:8000
```

### 4️⃣ Exploring the API
- The API endpoints are defined in the `routes/` directory.
- Use **Postman**, **cURL**, or any other API testing tool to interact with the endpoints.
- Check the different routes to understand the available data extraction methods.

## 🛠 Project Structure
```
📂 project-folder
 ├── 📂 node_modules  
 |
 ├── 📂 src      
 |   |
 |   ├── 📂 controllers    
 |   |   ├── apiController.js     
 |   |
 |   ├── 📂 routes        
 |   |   ├── apiRoutes.js  
 |   |     
 |   ├────── app.js    
 |   
 ├── .env   
 ├── .gitignore   
 ├── Documentation.md    
 ├── package-lock.json    
 ├── Readme.md    
 ├── package.json    
 ├── server.js
```

## 📌 Notes
- Since no documentation is provided for the API, manually explore responses and map out available endpoints.
- Debug logs might be useful. You can add `console.log` statements inside route handlers to track API behavior.
- If encountering CORS issues, consider enabling CORS in `server.js`:
  ```js
  const cors = require('cors');
  app.use(cors());
  ```

# API Exploration Documentation

## Project Initialization
The project was initialized using the following steps:

```sh
npm init -y
npm install express
npm install --save-dev nodemon dotenv cors morgan
mkdir src
```

## API Overview
The API provides multiple endpoints across different versions. This document details the findings from exploring the API.

### Base URL
```
http://35.200.185.69:8000/
```
#### Response:
```json
{
    "message": "This is the root endpoint of the API.",
    "tips": [
        "Try different endpoints (make a guess) to get started.",
        "Explore the different API versions also."
    ]
}
```

### Other Endpoints Found
```
http://35.200.185.69:8000/help
```
#### Response:
```json
{
    "message": "No documentation available. Figure it out!",
    "hint": "Try exploring different HTTP methods on this endpoint..."
}
```

## Other Information Obtained
With the help of nmap( a powerful open-source tool used for network discovery, security auditing, and port scanning) I also obtained the following information about the API
### **Scan Summary**
#### **Target Information:**
- **IP Address:** `35.200.185.69`
- **Resolved Hostname:** `69.185.200.35.bc.googleusercontent.com`
- **Cloud Provider:** Google Cloud
- The target **hosts a Uvicorn web server**.
- It can likely be a **FastAPI** or **Starlette** application.

---
## API Versions
The API has three identified versions: `v1`, `v2`, and `v3`. Requests made to `v4` and higher return a `Not Found` response.

### Version 1 (v1)
**Endpoint:**
```
http://35.200.185.69:8000/v1
```
#### Response:
```json
{
    "detail": "Not Found"
}
```

### Version 2 (v2)
**Autocomplete Endpoint:**
```
http://35.200.185.69:8000/v2/autocomplete?query=A
```
#### Response:
```json
{
    "version": "v2",
    "count": 0,
    "results": []
}
```

**Example Successful Request:**
```
http://35.200.185.69:8000/v2/autocomplete?query=b7
```
#### Response:
```json
{
    "version": "v2",
    "count": 4,
    "results": [
        "b71dych",
        "b72659he7r",
        "b78rh01"
    ]
}
```

### Version 3 (v3)
**Autocomplete Endpoint:**
```
http://35.200.185.69:8000/v3/autocomplete?query=a
```
#### Response:
```json
{
    "version": "v3",
    "count": 15,
    "results": []
}
```

---
## API Characteristics
### Query Case Sensitivity
- **No autocomplete results** are returned for queries starting with uppercase letters.

### Rate Limits
| Version | Requests per Minute |
|---------|--------------------|
| v1      | 100                |
| v2      | 50                 |
| v3      | 80                 |

### Maximum Number of Data Points Per Request
| Version | Max Data Points Returned |
|---------|--------------------------|
| v1      | 10                       |
| v2      | 12                       |
| v3      | 15                       |

### Character Support per Version
| Version | Allowed Characters |
|---------|---------------------|
| v1      | Lowercase letters only |
| v2      | Lowercase letters & numbers (can start with either) |
| v3      | Lowercase letters, numbers, `.`, `-`, `space`, `+` (must start with letter or number) |

---
## Results from API Exploration
### Version 1 (v1)
- **Total Data Points Extracted:** 13,676
- **Time Taken:** 1 hour, 40 minutes, 32 seconds
- **Total Requests Sent:** 8,928

### Version 2 (v2)
- **Total Data Points Extracted:** 7537
- **Time Taken:** 38 minutes, 21 seconds
- **Total Requests Sent:** 1867

### Version 3 (v3)
- **Total Data Points Extracted:** 5438
- **Time Taken:** 18 minutes, 14 seconds
- **Total Requests Sent:** 1322
---

### Please Go through the approach.md file to see the approach used to explore the api and handle the Rate Limits

Happy coding! 🚀

