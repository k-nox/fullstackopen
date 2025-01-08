const StatisticLine = ({label, value}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
    // <tr>{label} {value}</tr>
  )
}
export default StatisticLine