function Notification({ displayData, listSize }) {
    if (!displayData && listSize > 0) {
        return (
            <div id="warning-message">
                <h2>Too many matches, please be more specific</h2>
            </div>
        );
    }
}

export default Notification;