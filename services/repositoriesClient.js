const {graphql} = require('@octokit/graphql');

const userRes = async () => {
    const {user} = await graphql(
    `   query{

        user(login:"davimonteiro7"){
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
    `,
    {
      headers: {
        authorization: `token fbe14dad53d9a87d93f694368c7d46558d4172b4`,
      },
    }
  );

  return await user;
}
  console.log(userRes());