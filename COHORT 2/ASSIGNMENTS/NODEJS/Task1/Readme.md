# File Server in NodeJS 
## Building HTTP Server in Node JS which will handle the Files 


```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
```

1. **`const express = require('express');`**  
   This line imports the Express module, a popular web framework for Node.js Here, `express` is now an instance of the framework that will help create and manage the server.

2. **`const fs = require('fs');`**  
   This line imports Node.js's built-in `fs` (file system) module, which provides an API for interacting with the file system. We'll use this module to read files and directories on the server.

3. **`const path = require('path');`**  
   The `path` module is a built-in Node.js utility for handling and transforming file paths. It helps create file paths that work across different operating systems.

4. **`const app = express();`**  
   This line creates an instance of an Express application. The `app` object will be used to define routes and handle HTTP requests and responses.

---

### Route to List Files

```javascript
app.get('/files', function (req, res) {
    fs.readdir(path.join(__dirname, './files/'), (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve files' });
        }
        res.json(files);
    });
});
```

5. **`app.get('/files', function (req, res) { ... });`**  
   Defines a GET route at the endpoint `/files`. When a client makes a GET request to `/files`, the function specified here will run. `req` is the request object, and `res` is the response object.

6. **`fs.readdir(path.join(__dirname, './files/'), (err, files) => { ... });`**  
   This line reads the contents of the `./files/` directory using `fs.readdir()`. The `path.join(__dirname, './files/')` creates an absolute path to the `files` directory, ensuring the path works correctly regardless of the environment.  
   - If successful, `files` will contain an array of filenames.
   - If an error occurs, `err` will contain error details.

7. **`if (err) { return res.status(500).json({ error: 'Failed to retrieve files' }); }`**  
   Checks if an error occurred while reading the directory. If an error exists, a response with a 500 status code (internal server error) is sent back to the client as JSON, with an error message indicating failure to retrieve files.

8. **`res.json(files);`**  
   If there is no error, the list of filenames in the `files` directory is sent back to the client in JSON format.

---

### Route to Read a Specific File

```javascript
app.get('/files/:filename', function (req, res) {
    const filepath = path.join(__dirname, './files/', req.params.filename);

    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.send(data);
    });
});
```

9. **`app.get('/file/:filename', function (req, res) { ... });`**  
   Defines a dynamic GET route at the endpoint `/file/:filename`. The `:filename` segment is a route parameter, which allows clients to request a specific file by including its name in the URL (e.g., `/file/file.txt`).

10. **`const filepath = path.join(__dirname, './files/', req.params.filename);`**  
    Constructs the file path to the requested file using `path.join()`. `req.params.filename` captures the filename from the URL and appends it to the `./files/` directory path, forming the full file path.

11. **`fs.readFile(filepath, 'utf8', (err, data) => { ... });`**  
    Reads the file at `filepath` in UTF-8 encoding. If successful, `data` will contain the file content.

12. **`if (err) { return res.status(404).send('File not found'); }`**  
    Checks if there was an error reading the file. If so, it responds with a 404 status code (not found) and an error message indicating the file wasn’t found.

13. **`res.send(data);`**  
    If there is no error, the contents of the file are sent back to the client as plain text.

---

### Catch-All Route for Undefined Endpoints

```javascript
app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});
```

14. **`app.all('*', (req, res) => { ... });`**  
    Defines a catch-all route that matches any HTTP method (`app.all`) and any URL path (`'*'`) not previously defined. This ensures that if a client requests an undefined endpoint, the server will handle it gracefully.

15. **`res.status(404).send('Route not found');`**  
    Responds with a 404 status code and a message stating "Route not found" for any undefined route.

---

### Start the Server

```javascript
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
```
16. Finally, the app listens on port 3001, making it accessible at `http://localhost:3000`. Any requests sent to this server, such as `http://localhost:3001/files`, `http://localhost:3001/files/file.txt`  will be handled by the specified route.

