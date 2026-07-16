import yogaIcon from '../../assets/icons/yoga.svg'
import swimIcon from '../../assets/icons/swim.svg'
import bikeIcon from '../../assets/icons/bike.svg'
import dumbbellIcon from '../../assets/icons/dumbbell.svg'
import './Sidebar.css'

const ACTIVITIES = [
  { name: 'Relaxation', icon: yogaIcon },
  { name: 'Natation', icon: swimIcon },
  { name: 'Cyclisme', icon: bikeIcon },
  { name: 'Musculation', icon: dumbbellIcon },
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
