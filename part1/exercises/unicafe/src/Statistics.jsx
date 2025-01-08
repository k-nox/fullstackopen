import StatisticLine from './StatisticLine'

const Statistics = ({good, bad, neutral}) => {
    if (good === 0 && bad === 0 && neutral === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    const all = good + bad + neutral
    const average = (good - bad) / all
    const percentagePositive = good / all * 100
    return (
        <table>
            <tbody>
                <StatisticLine label='good' value={good} />
                <StatisticLine label='neutral' value={neutral} />
                <StatisticLine label='bad' value={bad} />
                <StatisticLine label='all' value={all} />
                <StatisticLine label='average' value={average} />
                <StatisticLine label='positive' value={`${percentagePositive}%`} />
            </tbody>
        </table>
  )
}
export default Statistics