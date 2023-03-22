export const typeDefs = `#graphql
  scalar Date
  type Folder {
    id: String!,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note],
    order: Int
  }
  input FolderUpdate{
    id: String,
    name: String,
    order: Int
  }
  type Note {
    id: String!,
    content: String,
    order: Int
    updatedAt: Date
  }
   input NoteUpdate {
    id: String!,
    content: String,
    order: Int
    updatedAt: Date
  }
  type Author {
    uid: String!,
    name: String!
  }
  type Query {
    folders: [Folder],
    folder(folderId: String!): Folder,
    note(noteId: String): Note,
  }
  type Mutation {
    addFolder(name: String!): Folder,
    updateFolderList(folderUpdate: [FolderUpdate]): [Folder],
    addNote(content: String!, folderId: ID!): Note,
    updateNote(id: String!,content: String!): Note,
    updateNoteList(noteUpdate: [NoteUpdate]): [Note],
    register(uid: String!, name: String!): Author
    pushNotification(content: String): Message
  }
  type Message {
    message: String
  }
  type Subscription {
    folderCreated: Message
    notification: Message
  }
`;
