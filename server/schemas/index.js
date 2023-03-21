export const typeDefs = `#graphql
  scalar Date
  type Folder {
    id: String!,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note]
  }
  input FolderUpdate {
    id: String,
    name: String,
  }
  type Note {
    id: String!,
    content: String,
    destination: String,
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
