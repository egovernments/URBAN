import { useState } from 'react'
import Card from './components/Card'
import Header from './components/Header'
import Faq from './components/Faqs'
import Footer from './components/Footer'
import Privacy from './components/Privacy'
import Impersonation from './components/Impersonation'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {


  return (
    <>
      <Header />
      {/* //basename="/common" */}
      <BrowserRouter basename="/common">
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/impersonation" element={<Impersonation />} />
          <Route path="*" element={<Card />} />
        </Routes>

      </BrowserRouter>
      {/* <Card />
      <center ><p style={{
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "36px",
        lineHeight: "42px",
        textAlign: "center",
        color: "rgba(0, 0, 0, 0.87)",
        marginLeft: "10%",
        marginRight: "10%"
      }}>Frequently Asked Questions</p></center >
      <div
        style={{
          marginLeft: "45%",
          marginRight: "45%", marginTop: "0%", borderBottom: "5px solid #f48952"
        }}>
      </div>
      <Faq /> */}
      <Footer />
    </>
  )
}

export default App
