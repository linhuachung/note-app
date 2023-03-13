export default {
    author: [
        {
            id: 123,
            name: 'User 1'
        },
        {
            id: 999,
            name: 'User 2'
        }
    ],
    folders: [
        {
            id: '1',
            name: 'Home',
            createdAt: '2022-11*18T03:42:13Z',
            authorId: 123
        },
        {
            id: '2',
            name: 'New folder',
            createdAt: '2022-11*18T03:42:13Z',
            authorId: 999
        },
        {
            id: '3',
            name: 'Work',
            createdAt: '2022-11*18T03:42:13Z',
            authorId: 123
        }
    ],
    notes: [
        {
            id: '123',
            content: '<p>Go to market</p>',
            folderId: '1'
        },
        {
            id: '234',
            content: '<p>Go to park</p>',
            folderId: '1'
        },
        {
            id: '456',
            content: '<p>Go to school</p>',
            folderId: '2'
        },
        {
            id: '678',
            content: '<p>Go to home</p>',
            folderId: '3'
        }
    ]
}
