import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Create from './components/Create'
import Manage from './components/Manage'
import Redirect from './components/Redirect'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4 min-h-viewport">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/r/:slug" element={<Redirect />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App