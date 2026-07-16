import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './ErrorMessage.css'

/**
 * Message d'erreur affiché lorsque les données ne peuvent pas être récupérées
 * (API indisponible, utilisateur inconnu…).
 * @param {Object} props
 * @param {string} [props.message] - Message d'erreur à afficher.
 * @returns {JSX.Element} Le bloc d'erreur.
 */
function ErrorMessage({
  message = 'Une erreur est survenue lors de la récupération des données.',
}) {
  return (
    <div className="error-message">
      <p className="error-message__title">Oups…</p>
      <p className="error-message__text">{message}</p>
      <Link to="/" className="error-message__link">
        Revenir à l&apos;accueil
      </Link>
    </div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
}

export default ErrorMessage
