const express = require('express');
const path = require('path');
const app = express();
const port = 8082;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/static', express.static('../browser/static'));
app.use('/api', express.static('../browser/api'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));