//Aqui colocamos todos os schemas para organizar o arquivo ../index.js
const usuarioData = require("../usuarioData.json");
const livroData = require("../livroData.json");
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } = graphql
const { graphqlHTTP } = require("express-graphql");

//importando objeto usuário chamado UsuarioType
const UsuarioType = require("./TypeDefs/UsuarioType")
const LivroType = require("./TypeDefs/LivroType")

//criada uma query que chama todos os usuários
const UsuarioQuery = new GraphQLObjectType({
    name: "getAllUsers",
    fields: {
        getAllUsers: {
            type: new GraphQLList(UsuarioType),
            args: { idEmail: { type: GraphQLString } },
            resolve(parent, args) {
                return usuarioData
            }
        }
    } // a partir daqui podemos criar outra query
})

const LivroQuery = new GraphQLObjectType({
    name:"getAllBooks",
    fields:{
        getAllBooks :{
            type: new GraphQLList(UsuarioType),
            args: {codLivro:{type: GraphQLInt}, idEmail:{type: GraphQLString}},
            resolve(parent, args) {
                return livroData
            }
        }
    }
})

//criada uma mutation para realizar o "cadastro" de usuários
const MutationUsuario = new GraphQLObjectType ({
    name: "MutationUsuario",
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
    }, //a partir daqui podemos criar outra mutation
})

const MutationLivro = new GraphQLObjectType({
    name: "MutationLivro",
    fields: {
        createLivro: {
            type: LivroType,
            args: {
                idEmail: { type: GraphQLString },
                codLivro:{type:GraphQLInt},
                nomeLivro: { type: GraphQLString },
            },
            resolve(parent, args) {
                //no push enviamos todas as informações a serem cadastradas e no return trazemos as informações cadastradas por meio do args
                livroData.push({ nomeLivro: args.nomeLivro, codLivro: args.codLivro });
                return args
            }
        }
    }
})

//importando para o arquivo inicial ./index.js
module.exports = new GraphQLSchema({ query: UsuarioQuery, mutation: MutationUsuario })
module.exports = new GraphQLSchema({ query: LivroQuery, mutation: MutationLivro })