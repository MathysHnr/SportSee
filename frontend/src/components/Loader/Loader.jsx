import './Loader.css'

/**
 * Indicateur de chargement affiché pendant la récupération des données.
 * @returns {JSX.Element} Le spinner de chargement.
 */
function Loader() {
  return (
    <div className="loader" role="status" aria-label="Chargement en cours">
      <span className="loader__spinner" />
    </div>
  )
}

export default Loader
