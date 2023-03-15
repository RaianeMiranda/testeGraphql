const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql
const { graphqlHTTP } = require("express-graphql");

//criamos o objeto usuário que traz todos os campos identificando seus types
const UsuarioType = new GraphQLObjectType({
    name: "usuario",
    fields: () => ({
        idEmail: { type: GraphQLString },
        nome: { type: GraphQLString },
        senha: { type: GraphQLString },
    })
})

//exportando objeto UsuarioType
module.exports = UsuarioType