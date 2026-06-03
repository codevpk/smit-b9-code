import { Route, Routes } from 'react-router-dom'

import Home from './Home'

import PageNotFound from '@/components/PageNotFound'

const Frontend = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default Frontend