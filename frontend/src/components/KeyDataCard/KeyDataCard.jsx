import PropTypes from 'prop-types'
import energyIcon from '../../assets/icons/energy.svg'
import chickenIcon from '../../assets/icons/chicken.svg'
import appleIcon from '../../assets/icons/apple.svg'
import cheeseburgerIcon from '../../assets/icons/cheeseburger.svg'
import './KeyDataCard.css'

/** Configuration d'affichage de chaque type de donnée clé. */
const KEY_DATA_CONFIG = {
  calories: {
    label: 'Calories',
    unit: 'kCal',
    icon: energyIcon,
    backgroundColor: 'rgba(255, 0, 0, 0.07)',
  },
  proteins: {
    label: 'Protéines',
    unit: 'g',
    icon: chickenIcon,
    backgroundColor: 'rgba(74, 184, 255, 0.1)',
  },
  carbohydrates: {
    label: 'Glucides',
    unit: 'g',
    icon: appleIcon,
    backgroundColor: 'rgba(253, 204, 12, 0.1)',
  },
  lipids: {
    label: 'Lipides',
    unit: 'g',
    icon: cheeseburgerIcon,
    backgroundColor: 'rgba(253, 81, 129, 0.1)',
  },
}

/**
 * Carte de donnée nutritionnelle clé (calories, protéines, glucides ou lipides).
 * @param {Object} props
 * @param {'calories'|'proteins'|'carbohydrates'|'lipids'} props.type - Type de donnée.
 * @param {number} props.value - Valeur à afficher.
 * @returns {JSX.Element} La carte de donnée clé.
 */
function KeyDataCard({ type, value }) {
  const { label, unit, icon, backgroundColor } = KEY_DATA_CONFIG[type]

  return (
    <div className="key-data-card">
      <div className="key-data-card__icon" style={{ backgroundColor }}>
        <img src={icon} alt={label} />
      </div>
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
