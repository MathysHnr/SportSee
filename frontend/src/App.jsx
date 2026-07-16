import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './pages/NotFound/NotFound'

/**
 * Racine de l'application : structure générale (header, sidebar, contenu)
 * et déclaration des routes.
 * @returns {JSX.Element} L'application complète.
 */
function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
        <main className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:userId" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
