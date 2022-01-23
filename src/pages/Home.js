import React from 'react'

import StaticHeader from '../shared/StaticHeader'
import FileTree from '../shared/FileTree'


function Home() {
    return (
        <div>
            <StaticHeader />
            <FileTree />
            <h1>Home</h1>
        </div>
    )
}

export default Home