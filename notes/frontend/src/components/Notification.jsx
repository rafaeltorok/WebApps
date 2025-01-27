function Notification({ message }) {
    if (message === null) {
        return null
    }

    return (
        <div className="error-message">
            <strong>{message}</strong>
        </div>
    );
}

export default Notification;