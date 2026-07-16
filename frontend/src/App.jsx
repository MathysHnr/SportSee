import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'

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
        <main className="app__content">
          <Routes>
            <Route path="/" element={<p>Accueil</p>} />
            <Route path="/user/:userId" element={<p>Profil</p>} />
            <Route path="*" element={<p>Page introuvable</p>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
