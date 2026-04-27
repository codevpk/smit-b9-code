import { Route, Routes } from 'react-router-dom'

import Frontend from './Frontend'
import Auth from './Auth'

const Index = () => {
    return (
        <Routes>
            <Route path='/*' element={<Frontend />} />
            <Route path='/auth/*' element={<Auth />} />
        </Routes>
    )
}

export default Index