const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/files', function (req, res) {
    fs.readdir(path.join(__dirname, './files/'), (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve files' });
        }
        res.json(files);
    });
});

app.get('/files/:filename', function (req, res) {
    const filepath = path.join(__dirname, './files/', req.params.filename);

    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.send(data);  // changed from res.json(data) to res.send(data)
    });
});

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
