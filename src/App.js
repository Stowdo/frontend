import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Restricted from './shared/Restricted'

import './App.scss'


export default function App() {
    return (
        <div className='App'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Restricted>
                            <Home next='/' />
                        </Restricted>
                    }
                />
                <Route
                    path='/settings'
                    element={
                        <Restricted>
                            <Settings next='/settings' />
                        </Restricted>
                    }
                />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </div>
    )
}