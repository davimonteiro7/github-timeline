const path = require('path');
const express = require('express');
const app = express();
let ejs = require('ejs');
const getReposByUser = require('./services/repositoriesClient');

app.use('/public',express.static('./views/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/timeline', (req, res) => {
    const username = req.query.username;
    getReposByUser(username).then(reposObject => {
        var repos = reposObject.repos;

        function reposByYear(repos){
            const years = [];
            repos.forEach(repo => {
                const year = new Date(repo.createdAt).getFullYear();
                years.push(year);
            });

            const reposOnYear = years.reduce((objYears, year) => {
                if(typeof objYears[year] == 'undefined'){
                    objYears[year] = 1;
                }else{
                    objYears[year] += 1;
                }
                return objYears;
            }, {})
            
            return reposOnYear;
        }
        
        const rby = Object.entries(reposByYear(repos));
        console.log(rby);
        res.render('timeline', {reposObject, rby}, );
        
        

    }).catch(error => {
        console.log('Invalid Username!', error);
        res.render('alert-message');
      });

});
app.listen(4000, () => console.log('Example app listening on port 4000'));