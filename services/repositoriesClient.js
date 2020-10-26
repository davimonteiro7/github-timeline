const { graphql } = require("@octokit/graphql");
require('dotenv').config();

const graphqlWithAuth = graphql.defaults({
  headers: {
    //Create a .env file and configure your personal github token there.
    authorization: `token ${process.env.SECRET_API}`
  },
});

async function getReposByUser(username) {
  return await graphqlWithAuth(`
    { 
      user(login: "${username}"){
        name
        repositories(first:100, orderBy:{field: CREATED_AT ,direction:ASC}){
          nodes{
            createdAt
            name
            description
          } 
        }
      }
    }
  `).then(data => {
      return {
        repos: data.user.repositories.nodes
      }
    });
}

module.exports = getReposByUser;
