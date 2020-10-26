const path = require('path');
const express = require('express');
const app = express();

const getReposByUser = require('./services/repositoriesClient');

app.use('/public',express.static('./views/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/timeline', (req, res) => {
    const username = req.query.username;
    console.log(username);

    getReposByUser(username).then(reposObject => {
        res.render('timeline', {reposObject});
        console.log(reposObject);
    }).catch(error => {
        console.log('Invalid Username!');
        res.render('alert-message');
      });
});
app.listen(4000, () => console.log('Example app listening on port 4000'));