import PropTypes from 'prop-types'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './ActivityChart.css'

/**
 * Infobulle personnalisée du graphique d'activité :
 * encart rouge affichant le poids (kg) et les calories (kCal).
 * @param {Object} props
 * @param {boolean} props.active - Vrai si l'infobulle doit être affichée.
 * @param {Array<Object>} props.payload - Données du point survolé.
 * @returns {JSX.Element|null} L'infobulle ou null.
 */
function ActivityTooltip({ active, payload }) {
  if (!active || !payload || payload.length < 2) {
    return null
  }

  return (
    <div className="activity-chart__tooltip">
      <p>{`${payload[0].value}kg`}</p>
      <p>{`${payload[1].value}Kcal`}</p>
    </div>
  )
}

ActivityTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
}

/**
 * Graphique en barres de l'activité quotidienne :
 * poids (kg) et calories brûlées (kCal) jour par jour.
 * @param {Object} props
 * @param {Array<import('../../models/dataFormatter').ActivitySession>} props.data
 * Les sessions d'activité standardisées.
 * @returns {JSX.Element} Le graphique d'activité quotidienne.
 */
function ActivityChart({ data }) {
  return (
    <div className="activity-chart">
      <div className="activity-chart__header">
        <h2 className="activity-chart__title">Activité quotidienne</h2>
        <ul className="activity-chart__legend">
          <li className="activity-chart__legend-item activity-chart__legend-item--weight">
            Poids (kg)
          </li>
          <li className="activity-chart__legend-item activity-chart__legend-item--calories">
            Calories brûlées (kCal)
          </li>
        </ul>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={8} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DEDEDE" />
          <XAxis
            dataKey="index"
            tickLine={false}
            axisLine={{ stroke: '#DEDEDE' }}
            tick={{ fill: '#9B9EAC', fontSize: 14 }}
            dy={8}
          />
          <YAxis
            yAxisId="kilogram"
            dataKey="kilogram"
            orientation="right"
            domain={['dataMin - 1', 'dataMax + 2']}
            tickCount={3}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9B9EAC', fontSize: 14 }}
            dx={16}
          />
          <YAxis yAxisId="calories" dataKey="calories" hide domain={[0, 'dataMax + 50']} />
          <Tooltip content={<ActivityTooltip />} cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }} />
          <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

ActivityChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      kilogram: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default ActivityChart
