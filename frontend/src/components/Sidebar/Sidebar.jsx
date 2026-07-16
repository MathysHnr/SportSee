import meditationIcon from '../../assets/icons/meditation.svg'
import swimmingIcon from '../../assets/icons/swimming.svg'
import cyclingIcon from '../../assets/icons/cycling.svg'
import bodybuildingIcon from '../../assets/icons/bodybuilding.svg'
import './Sidebar.css'

const ACTIVITIES = [
  { name: 'Relaxation', icon: meditationIcon },
  { name: 'Natation', icon: swimmingIcon },
  { name: 'Cyclisme', icon: cyclingIcon },
  { name: 'Musculation', icon: bodybuildingIcon },
]

/**
 * Barre latérale verticale : raccourcis vers les activités sportives
 * et mention de copyright.
 * @returns {JSX.Element} La sidebar de l'application.
 */
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__icons">
        {ACTIVITIES.map((activity) => (
          <button
            key={activity.name}
            type="button"
            className="sidebar__icon-button"
            title={activity.name}
          >
            <img src={activity.icon} alt={activity.name} />
          </button>
        ))}
      </div>
      <p className="sidebar__copyright">Copyright, SportSee 2020</p>
    </aside>
  )
}

export default Sidebar
