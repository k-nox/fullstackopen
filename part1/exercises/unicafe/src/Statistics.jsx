import Statistic from './Statistic'

const Statistics = ({good, bad, neutral}) => {
    const all = good + bad + neutral
    const average = (good - bad) / all
    const percentagePositive = good / all * 100
    return (
        <>
            <Statistic label='good' value={good} />
            <Statistic label='neutral' value={neutral} />
            <Statistic label='bad' value={bad} />
            <Statistic label='all' value={all} />
            <Statistic label='average' value={average} />
            <Statistic label='positive' value={`${percentagePositive}%`} />
        </>
  )
}
export default Statistics