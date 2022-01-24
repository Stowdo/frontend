import React from 'react'

import StaticHeader from '../shared/StaticHeader'
import FileTree from '../shared/FileTree'
import FileList from '../shared/FileList'
import ActionBar from '../shared/ActionBar'


function Home() {
    let files = [
        {
            isFolder: true,
            name: 'Homework',
            size: '1.2 MB',
            date: '1st january 2017'
        },
        {
            isFolder: true,
            name: 'Tests',
            size: '1.2 MB',
            date: '1st january 2017'
        },
        {
            isFolder: false,
            name: 'my powerpoint.pptx',
            size: '1.2 MB',
            date: '1st january 2017'
        }
    ]

    return (
        <div>
            <StaticHeader />
            <FileTree />
            <FileList files={files} />
            <ActionBar />
        </div>
    )
}

export default Home