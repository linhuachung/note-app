import {graphUrlRequest} from "./request.jsx";

export const folderLoader = async () => {
    const query = `query Folder {
                         folders {
                         id
                         name
                   }}`
    const data = await graphUrlRequest({query})
    return data
}

export const addNewFolder = async (newFolder) => {
    const query = `mutation Mutation($name: String!) {
                         addFolder(name: $name) {
                         name
                         author{
                            name
                         }
                   }}`
    const data = await graphUrlRequest({query, variables: {
            name: newFolder.name,
        },})
    return data
}
