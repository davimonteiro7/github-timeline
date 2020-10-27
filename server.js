const path = require('path');
const express = require('express');
const app = express();

const getReposByUser = require('./services/repositoriesClient');
const yearsOccurency = (years = []) => {
    years.forEach((year, index) => {
        if (year == year[index + 1]){
            console.log(year);
        } 
    }) 
}

app.use('/public',express.static('./views/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/timeline', (req, res) => {
    const username = req.query.username;
    getReposByUser(username).then(reposObject => {
        
        //var years = [];
        //reposObject.repos.forEach(repo => {
        //    const year = new Date(repo.createdAt).getFullYear();
        //    reposByYear.push(year);
        //});
        //yearsOccurency(years);
        res.render('timeline', {reposObject});
        
    }).catch(error => {
        console.log('Invalid Username!');
        res.render('alert-message');
      });
});
app.listen(4000, () => console.log('Example app listening on port 4000'));