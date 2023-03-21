import {graphUrlRequest} from "./request.jsx";

export const notesLoader = async ({ params: { folderId } }) => {
    const query = `query Folder($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        id
        content
        updatedAt
      }
    }
  }`;

    return await graphUrlRequest({
        query,
        variables: {
            folderId,
        },
    });
};

export const noteLoader = async ({ params: { noteId } }) => {
    const query = `query Note($noteId: String) {
    note(noteId: $noteId) {
      content
      id
    }
  }`;

    return await graphUrlRequest({
        query,
        variables: {
            noteId,
        },
    });
};

export const addNewNote = async ({params, request}) => {
    const newNote = await request.formData()
    const formDataObj = {}
    newNote.forEach((value, key)=> {
        formDataObj[key] = value
    })
    const query = `mutation Mutation($content: String!, $folderId: ID!) {
        addNote(content: $content, folderId: $folderId) {
            id
            content
        }
    }`
    const {addNote} = await graphUrlRequest({query,
        variables: formDataObj
    })
    return addNote
}

export const updateNote = async ({params, request}) => {
    const updatedNote = await request.formData()
    const formDataObj = {}
    updatedNote.forEach((value, key)=> {
        formDataObj[key] = value
    })
    const query = `mutation Mutation( $id: String!, $content: String!) {
        updateNote(id: $id, content: $content) {
            id
            content
        }
    }`
    const {updateNote} = await graphUrlRequest({query,
        variables: formDataObj
    })
    return updateNote
}
