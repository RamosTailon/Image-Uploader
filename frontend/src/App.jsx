import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

//LAYOUTS
import Container from './layouts/Container'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'

//PAGES
import Home from './pages/Home'
import AddImages from './pages/AddImages'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddImages />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
