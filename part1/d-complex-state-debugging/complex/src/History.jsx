const History = ({ allClicks }) => {
    if (allClicks.length === 0) {
        return (
            <div>
                the app is used by pressing the button
            </div>
        )
    }

    return (
        <div>
            button press history: {allClicks.join(' ')}
        </div>
    )
}
export default History