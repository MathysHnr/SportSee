import PropTypes from 'prop-types'
import caloriesIcon from '../../assets/icons/calories.svg'
import proteinIcon from '../../assets/icons/protein.svg'
import carbsIcon from '../../assets/icons/carbs.svg'
import fatIcon from '../../assets/icons/fat.svg'
import './KeyDataCard.css'

/** Configuration d'affichage de chaque type de donnée clé. */
const KEY_DATA_CONFIG = {
  calories: { label: 'Calories', unit: 'kCal', icon: caloriesIcon },
  proteins: { label: 'Protéines', unit: 'g', icon: proteinIcon },
  carbohydrates: { label: 'Glucides', unit: 'g', icon: carbsIcon },
  lipids: { label: 'Lipides', unit: 'g', icon: fatIcon },
}

/**
 * Carte de donnée nutritionnelle clé (calories, protéines, glucides ou lipides).
 * @param {Object} props
 * @param {'calories'|'proteins'|'carbohydrates'|'lipids'} props.type - Type de donnée.
 * @param {number} props.value - Valeur à afficher.
 * @returns {JSX.Element} La carte de donnée clé.
 */
function KeyDataCard({ type, value }) {
  const { label, unit, icon } = KEY_DATA_CONFIG[type]

  return (
    <div className="key-data-card">
      <img src={icon} alt={label} className="key-data-card__icon" />
      <div className="key-data-card__infos">
        <p className="key-data-card__value">
          {value.toLocaleString('en-US')}
          {unit}
        </p>
        <p className="key-data-card__label">{label}</p>
      </div>
    </div>
  )
}

KeyDataCard.propTypes = {
  type: PropTypes.oneOf(['calories', 'proteins', 'carbohydrates', 'lipids']).isRequired,
  value: PropTypes.number.isRequired,
}

export default KeyDataCard
