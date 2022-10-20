const {projects, clients } = require('../sampleData');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const { model } = require('mongoose');

const ProjectType = new GraphQLObjectType({
    name : 'Project',
    fields : () =>({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        description : { type : GraphQLString},
        status : { type : GraphQLString},
    }),
});

const ClientType = new GraphQLObjectType({
    name : 'Client',
    fields : () =>({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        email : { type : GraphQLString},
        phone : { type : GraphQLString},
    }),
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parents,agrs){
                return clients;
            },
        },
        project :{
            type : ProjectType,
            args : {id : {type : GraphQLID}},
            resolve(parents,args){
                return projects.find(project  => project.id=== args.id);
            }
        },
        clients: {
            type: GraphQLList(ClientType),
            resolve(parents,agrs){
                return clients;
            },
        },
        client :{
            type : ClientType,
            args : {id : {type : GraphQLID}},
            resolve(parents,args){
                return clients.find(client => client.id=== args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
})