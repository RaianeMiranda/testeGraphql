const express = require("express");
const app = express();
const PORT = 3006;
const usuarioData = require("./usuarioData.json");
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = graphql
const { graphqlHTTP } = require("express-graphql");

const UsuarioType = new GraphQLObjectType({
    name: "usuario",
    fields: () => ({
        idEmail: { type: GraphQLString },
        nome: { type: GraphQLString },
        senha: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UsuarioType),
            args: { idEmail: { type: GraphQLString } },
            resolve(parent, args) {
                return usuarioData
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUsuario: {
            type: UsuarioType,
            args: {
                idEmail: { type: GraphQLString },
                nome: { type: GraphQLString },
                senha: { type: GraphQLString },
            },
            resolve(parent, args){
                usuarioData.push({idEmail:args.idEmail, nome: args.nome, senha: args.senha});
                return args
            }
        }
    }
})

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("server running");
});
//