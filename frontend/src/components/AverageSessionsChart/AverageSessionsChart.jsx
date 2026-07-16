import PropTypes from 'prop-types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from 'recharts'
import './AverageSessionsChart.css'

/**
 * Infobulle personnalisée : encart blanc affichant la durée de la session.
 * @param {Object} props
 * @param {boolean} props.active - Vrai si l'infobulle doit être affichée.
 * @param {Array<Object>} props.payload - Données du point survolé.
 * @returns {JSX.Element|null} L'infobulle ou null.
 */
function SessionTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return <div className="average-sessions__tooltip">{`${payload[0].value} min`}</div>
}

SessionTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
}

/**
 * Curseur personnalisé : assombrit la zone du graphique située
 * à droite du point survolé, comme sur la maquette.
 * @param {Object} props
 * @param {Array<{x: number, y: number}>} props.points - Position du curseur.
 * @returns {JSX.Element} Le rectangle d'assombrissement.
 */
function SessionCursor({ points }) {
  const { x } = points[0]

  return <Rectangle x={x} y={0} width={1000} height={300} fill="rgba(0, 0, 0, 0.1)" />
}

SessionCursor.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ),
}

/**
 * Graphique en courbe de la durée moyenne des sessions par jour de la semaine.
 * @param {Object} props
 * @param {Array<import('../../models/dataFormatter').AverageSession>} props.data
 * Les sessions moyennes standardisées.
 * @returns {JSX.Element} Le graphique de durée moyenne des sessions.
 */
function AverageSessionsChart({ data }) {
  return (
    <div className="average-sessions">
      <h2 className="average-sessions__title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 80, right: 16, bottom: 24, left: 16 }}>
          <defs>
            <linearGradient id="sessionLineGradient" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12, fontWeight: 500 }}
            dy={12}
          />
          <YAxis hide domain={['dataMin - 15', 'dataMax + 20']} />
          <Tooltip content={<SessionTooltip />} cursor={<SessionCursor />} />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#sessionLineGradient)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 4,
              fill: '#FFFFFF',
              stroke: 'rgba(255, 255, 255, 0.3)',
              strokeWidth: 9,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

AverageSessionsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      sessionLength: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default AverageSessionsChart
