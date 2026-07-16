import PropTypes from 'prop-types'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import './ScoreChart.css'

/**
 * Graphique radial du score du jour : arc de cercle représentant
 * le pourcentage de l'objectif quotidien atteint.
 * @param {Object} props
 * @param {number} props.score - Score entre 0 et 1.
 * @returns {JSX.Element} Le graphique de score.
 */
function ScoreChart({ score }) {
  const percentage = Math.round(score * 100)
  const chartData = [{ value: percentage }]

  return (
    <div className="score-chart">
      <h2 className="score-chart__title">Score</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={chartData}
          innerRadius="70%"
          outerRadius="80%"
          startAngle={90}
          endAngle={450}
          barSize={10}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            dataKey="value"
            angleAxisId={0}
            fill="#FF0000"
            cornerRadius={10}
            background={{ fill: '#FFFFFF' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="score-chart__inner-circle" />
      <div className="score-chart__label">
        <p className="score-chart__percentage">{percentage}%</p>
        <p className="score-chart__caption">
          de votre
          <br />
          objectif
        </p>
      </div>
    </div>
  )
}

ScoreChart.propTypes = {
  score: PropTypes.number.isRequired,
}

export default ScoreChart
