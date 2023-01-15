import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

//LAYOUTS
import Container from './layouts/Container'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'

//COMPONENTS
import Message from './components/Message'

//PAGES
import Home from './pages/Home'
import AddImages from './pages/AddImages'
import Details from './pages/Details'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddImages />} />
            <Route path='/details/:id' element={<Details />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
