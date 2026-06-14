import React from 'react'
import All from './All'
import { Route, Routes } from 'react-router-dom'
import Add from './Add'
import Edit from './Edit'

const Todos = () => {
    return (
        <Routes>
            <Route path='all' element={<All />} />
            <Route path='add' element={<Add />} />
            <Route path='edit/:id' element={<Edit />} />
            <Route path='*' element={<h1>Page Not Found!</h1>} />
        </Routes>
    )
}

export default Todos