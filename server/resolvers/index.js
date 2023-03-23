import {AuthorModel, FolderModel, NoteModel, NotificationModel} from "../models/index.js";
import {GraphQLScalarType} from 'graphql'
import {PubSub} from 'graphql-subscriptions';

import noteModel from "../models/NoteModel.js";

const pubsub = new PubSub();

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
            const list = await FolderModel.find({
                authorId: context.uid
            }).sort({
                order: 'asc'
            })
            return list
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
                order: 'asc'
            })
        }
    },
    Mutation: {
        addNote: async (parent, args) => {
            const listNote = await NoteModel.find({folderId: args.folderId})
            const newNote = new NoteModel({...args, order: listNote.length})
            await pubsub.publish("NOTE_CREATED", {
                folderCreated: {
                    message: 'A new note created',
                },
            })
            await newNote.save()
            return newNote
        },
        updateNote: async (parent, args) => {
            const noteId = args.id
            return await noteModel.findByIdAndUpdate(noteId, args)
        },
        updateNoteList: async (parent, args, context) => {
            const {noteUpdate} = args
            return await Promise.all(noteUpdate.map(async (item) => {
                return await NoteModel.findByIdAndUpdate(item.id, item)
            }));
        },
        addFolder: async (parent, args, context) => {
            const listFolder = await FolderModel.find({authorId: context.uid})
            const newFolder = new FolderModel({...args, authorId: context.uid, order: listFolder.length})

            await pubsub.publish("FOLDER_CREATED", {
                folderCreated: {
                    message: 'A new folder created',
                },
            })

            newFolder.save()
            return newFolder
        },
        updateFolderList: async (parent, args, context) => {
           const {folderUpdate} = args
            return await Promise.all(folderUpdate.map(async (item) => {
                return await FolderModel.findByIdAndUpdate(item.id, item)
            }));
        },
        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({uid: args.uid});
            if (!foundUser) {
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            }

            return foundUser;
        },
        pushNotification: async (parent, args) => {
            const newNotification = new NotificationModel(args)
            await pubsub.publish("PUSH_NOTIFICATION", {
                notification: {
                    message: args.content,
                },
            })
            await newNotification.save()
            return {message: 'SUCCESS'}
        },
    },
    Subscription: {
        folderCreated: {
            subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED', 'NOTE_CREATED'])
        },
        notification: {
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
        }
    }
}
