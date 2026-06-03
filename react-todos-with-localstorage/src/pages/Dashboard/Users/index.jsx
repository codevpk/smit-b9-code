import { Route, Routes } from 'react-router-dom'

import All from './All'
import Add from './Add'

const Users = () => {
    return (
        <Routes>
            <Route path='all' element={<All />} />
            <Route path='add' element={<Add />} />
            <Route path='*' element={<h1>Page Not Found!</h1>} />
        </Routes>
    )
}

export default Users