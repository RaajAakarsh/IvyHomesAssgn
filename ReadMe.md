# Express API Exploration Project

This project is an assignment focused on exploring an API and extracting all possible data without any provided documentation. The goal is to analyze the API, understand its structure, and retrieve relevant information. 

## Additional Information
For a more detailed breakdown of the extracted data and further findings, refer to the **Documentation.md** file in the project directory.

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

## 📞 Support
For any issues or questions, feel free to open an issue or contribute to the project.

Happy coding! 🚀

