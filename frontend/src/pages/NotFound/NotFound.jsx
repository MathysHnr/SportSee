import { Link } from 'react-router-dom'
import './NotFound.css'

/**
 * Page 404 affichée lorsque la route demandée n'existe pas.
 * @returns {JSX.Element} La page d'erreur 404.
 */
function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <p className="not-found__text">Oups ! La page que vous demandez n&apos;existe pas.</p>
      <Link to="/" className="not-found__link">
        Retourner sur la page d&apos;accueil
      </Link>
    </div>
  )
}

export default NotFound
