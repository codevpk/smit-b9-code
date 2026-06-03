import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Users from './Users'
import Todos from './Todos'
import Settings from './Settings'

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='users/*' element={<Users />} />
            <Route path='todos/*' element={<Todos />} />
            <Route path='settings' element={<Settings />} />
            <Route path='*' element={<h1>Page Not Found!</h1>} />
        </Routes>
    )
}

export default Index