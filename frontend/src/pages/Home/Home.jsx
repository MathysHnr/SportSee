import { Link } from 'react-router-dom'
import './Home.css'

/** Profils de démonstration exposés par l'API. */
const DEMO_USERS = [
  { id: 12, name: 'Karl' },
  { id: 18, name: 'Cecilia' },
]

/**
 * Page d'accueil : permet de choisir le profil utilisateur à consulter.
 * @returns {JSX.Element} La page d'accueil.
 */
function Home() {
  return (
    <div className="home">
      <h1 className="home__title">
        Bienvenue sur <span className="home__title-brand">SportSee</span>
      </h1>
      <p className="home__subtitle">Sélectionnez un profil pour accéder à son tableau de bord.</p>
      <ul className="home__users">
        {DEMO_USERS.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`} className="home__user-card">
              <span className="home__user-name">{user.name}</span>
              <span className="home__user-id">Utilisateur n°{user.id}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
