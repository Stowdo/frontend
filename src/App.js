import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Restricted from './shared/Restricted'


export default function App() {
    return (
        <div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Restricted next='/'>
                            <Home />
                        </Restricted>
                    }
                />
                <Route
                    path='/settings'
                    element={
                        <Restricted next='/settings'>
                            <Settings />
                        </Restricted>
                    }
                />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </div>
    )
}