import {AuthorModel, FolderModel, NoteModel} from "../models/index.js";
import {GraphQLScalarType} from 'graphql'
import noteModel from "../models/NoteModel.js";

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value){
            return new Date(value)
        },
        serialize(value){
            return value.toISOString()
        }
    }),
    Query: {
        folders: async (parent, args, context) => {
            return await FolderModel.find({
                authorId: context.uid
            }).sort({
                updatedAt: 'desc'
            })
        },
        folder: async (parent, args) => {
            const folderId = args.folderId
            return await FolderModel.findById(folderId)
        },
        note: async (parent, args) => {
            const noteId = args.noteId
            return await NoteModel.findById(noteId)
        },
    },
    Folder: {
        author: async (parent, args) => {
            const authorId = parent.authorId
            return await AuthorModel.findOne({
                uid: authorId
            })
        },
        notes: async (parent, args) => {
            return await NoteModel.find({
                folderId: parent.id
            }).sort({
                updatedAt: 'desc'
            })
        }
    },
    Mutation: {
        addNote: async (parent, args) => {
            const newNote = new NoteModel(args)
            await newNote.save()
            return newNote
        },
        updateNote: async (parent, args) => {
            const noteId = args.id
            return await noteModel.findByIdAndUpdate(noteId, args)
        },
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({...args, authorId: context.uid})
            await newFolder.save()
            return newFolder
        },
        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid });
            if (!foundUser) {
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            }

            return foundUser;
        },
    }
}
