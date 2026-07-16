import { useParams } from 'react-router-dom'
import {
  getUser,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from '../../services/dataService'
import { useFetchData } from '../../hooks/useFetchData'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import ActivityChart from '../../components/ActivityChart/ActivityChart'
import AverageSessionsChart from '../../components/AverageSessionsChart/AverageSessionsChart'
import PerformanceChart from '../../components/PerformanceChart/PerformanceChart'
import ScoreChart from '../../components/ScoreChart/ScoreChart'
import KeyDataCard from '../../components/KeyDataCard/KeyDataCard'
import './Dashboard.css'

/**
 * Page profil : tableau de bord complet d'un utilisateur
 * (message d'accueil, graphiques d'activité et données nutritionnelles).
 * L'identifiant de l'utilisateur est lu dans l'URL (`/user/:userId`).
 * @returns {JSX.Element} La page de tableau de bord.
 */
function Dashboard() {
  const { userId } = useParams()
  const id = Number(userId)

  const user = useFetchData(getUser, id)
  const activity = useFetchData(getUserActivity, id)
  const averageSessions = useFetchData(getUserAverageSessions, id)
  const performance = useFetchData(getUserPerformance, id)

  const isLoading =
    user.isLoading || activity.isLoading || averageSessions.isLoading || performance.isLoading

  const error = user.error || activity.error || averageSessions.error || performance.error

  if (!Number.isInteger(id)) {
    return <ErrorMessage message="Cet identifiant d'utilisateur n'est pas valide." />
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  return (
    <div className="dashboard">
      <section className="dashboard__greeting">
        <h1 className="dashboard__greeting-title">
          Bonjour <span className="dashboard__greeting-name">{user.data.firstName}</span>
        </h1>
        <p className="dashboard__greeting-text">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </section>
      <section className="dashboard__content">
        <div className="dashboard__charts">
          <ActivityChart data={activity.data} />
          <div className="dashboard__charts-row">
            <AverageSessionsChart data={averageSessions.data} />
            <PerformanceChart data={performance.data} />
            <ScoreChart score={user.data.score} />
          </div>
        </div>
        <aside className="dashboard__key-data">
          <KeyDataCard type="calories" value={user.data.keyData.calories} />
          <KeyDataCard type="proteins" value={user.data.keyData.proteins} />
          <KeyDataCard type="carbohydrates" value={user.data.keyData.carbohydrates} />
          <KeyDataCard type="lipids" value={user.data.keyData.lipids} />
        </aside>
      </section>
    </div>
  )
}

export default Dashboard
