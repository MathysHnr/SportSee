import PropTypes from 'prop-types'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import './PerformanceChart.css'

/**
 * Graphique radar des performances de l'utilisateur
 * (intensité, vitesse, force, endurance, énergie, cardio).
 * @param {Object} props
 * @param {Array<import('../../models/dataFormatter').PerformanceEntry>} props.data
 * Les performances standardisées.
 * @returns {JSX.Element} Le graphique radar de performance.
 */
function PerformanceChart({ data }) {
  return (
    <div className="performance-chart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="62%" cx="50%" cy="50%">
          <PolarGrid radialLines={false} stroke="#FFFFFF" />
          <PolarAngleAxis
            dataKey="kind"
            tickLine={false}
            tick={{ fill: '#FFFFFF', fontSize: 12, fontWeight: 500 }}
          />
          <Radar dataKey="value" fill="#FF0101" fillOpacity={0.7} stroke="none" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

PerformanceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default PerformanceChart
