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
- **Total Data Points Extracted:** *Pending*
- **Time Taken:** *Pending*
- **Total Requests Sent:** *Pending*

### Version 3 (v3)
- **Total Data Points Extracted:** *Pending*
- **Time Taken:** *Pending*
- **Total Requests Sent:** *Pending*

---


