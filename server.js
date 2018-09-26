let fs = require('fs');
let path = require('path');
let express = require('express');
let app = express();

// Register All API routes of the App
app.get('/test', (req, res) => {
    res.send('Response from /test route.');
});

app.use('/updates/releases', express.static(path.join(__dirname, 'releases')));

app.get('/updates/latest', (req, res) => {
    const latest = getLatestRelease();
    const clientVersion = req.query.v;

    if(clientVersion === latest) {
        res.status(204).end();
    } else {
        res.json({
            url: `http://localhost:3000/releases/darwin/${latest}/App.zip`
        });
    }
});


// Helper Functions
let getLatestRelease = () => {
    const dir = `${__dirname}/releases/darwin`;
    const versionDesc = fs.readdirSync(dir).filter(file => {
        const filePath = path.join(dir, file);
        return fs.statSync(filePath).isDirectory();
    }).reverse();

    return versionDesc[0];
};

// Start listening on specified port
app.listen(3000, () => {
    console.log('App started on port 3000');
});