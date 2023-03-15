const express = require("express");
const app = express();
const PORT = 3006;
const { graphqlHTTP } = require("express-graphql");
//importamos os shemas
const schema = require("./Schemas/shema.js")

//url para acessar a extensão do google GraphiQL
app.use('/graphql', graphqlHTTP({
    schema,
    //ativamos o uso da extensão, se não for necessário usar "false"
    graphiql: true
}));

//ALERT: SERVER IS RUNNING
app.listen(PORT, () => {
    console.log("server running");
});