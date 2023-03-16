const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql
const { graphqlHTTP } = require("express-graphql");

//criamos o objeto usuário que traz todos os campos identificando seus types
const LivroType = new GraphQLObjectType({
    name: "livro",
    fields: () => ({
        idEmail: { type: GraphQLString },
        codLivro: { type: GraphQLString },
        nomeLivro: { type: GraphQLString },
    })
})

//exportando objeto UsuarioType
module.exports = LivroType