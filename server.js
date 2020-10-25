const path = require('path');
const express = require('express');
const app = express();

app.use('/public',express.static('./views/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const fakeRepos = {
    hasData: true,
    name: 'fakename',
    description: 'fakedescription',
    fakedate: 'fakedate'
}

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/timeline', (req, res) => {
    const username = req.query.username;
    
    res.render('timeline', {fakeRepos});
});

app.listen(4000, () => console.log('Example app listening on port 4000'));