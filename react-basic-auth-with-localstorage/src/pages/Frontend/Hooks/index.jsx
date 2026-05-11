import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UseState from './UseState'
import UseEffect from './UseEffect'
import UseRef from './UseRef'

const Hooks = () => {
    return (
        <Routes>
            <Route path='useState' element={<UseState />} />
            <Route path='useEffect' element={<UseEffect />} />
            <Route path='useRef' element={<UseRef />} />
        </Routes>
    )
}

export default Hooks