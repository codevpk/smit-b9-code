import { Route, Routes } from 'react-router-dom'

import Home from './Home'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import PageNotFound from '@/components/PageNotFound'
import Todos from './Todos'

const Frontend = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default Frontend