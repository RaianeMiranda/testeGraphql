//Aqui colocamos todos os schemas para organizar o arquivo ../index.js
const express = require("express")
const app = express();
const PORT = 3006;
const usuarioData = require("../usuarioData.json");
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = graphql
const { graphqlHTTP } = require("express-graphql");

//importando objeto usuário chamado UsuarioType
const UsuarioType = require("./TypeDefs/UsuarioType")

//criada uma query que chama todos os usuários
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

//criada uma mutation para realizar o "cadastro" de usuários
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
            resolve(parent, args) {
                //no push enviamos todas as informações a serem cadastradas e no return trazemos as informações cadastradas por meio do args
                usuarioData.push({ idEmail: args.idEmail, nome: args.nome, senha: args.senha });
                return args
            }
        }
        //a partir daqui podemos criar outra mutation
    }
})

//importando para o arquivo inicial ./index.js
module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })