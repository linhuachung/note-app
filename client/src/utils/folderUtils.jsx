import {graphUrlRequest} from "./request.jsx";

export const folderLoader = async () => {
    const query = `query Folder {
                         folders {
                         id
                         name
                         order
                   }}`
    const data = await graphUrlRequest({query})
    return data
}

export const addNewFolder = async (newFolder) => {
    const query = `mutation Mutation($name: String!) {
                         addFolder(name: $name) {
                         name
                    
                   }}`
    return await graphUrlRequest({
        query, variables: {
            name: newFolder.name,
        },
    })
}

export const updateFolderList = async (folderUpdate) => {
    const query = `mutation Mutation( $folderUpdate: [FolderUpdate]) {
        updateFolderList(folderUpdate: $folderUpdate ) {
            id
            name
        }
    }`
    return await graphUrlRequest({
            query,
            variables: {folderUpdate}
    })
}
