import { Route, Routes } from "react-router-dom"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageNotFound from "@/components/PageNotFound"

import Home from "./Home"
import About from "./About"
import Contact from "./Contact"

const Frontend = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Frontend