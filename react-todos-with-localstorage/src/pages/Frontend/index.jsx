import { Route, Routes } from 'react-router-dom'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import Home from './Home'
import Todos from './Todos'

const Frontend = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='todos' element={<Todos />} />
                <Route path='*' element={<h1>Page Not Found!</h1>} />
            </Routes>
            <Footer />
        </>
    )
}

export default Frontend