function Notification({ message, typeOf }) {
    if (message === null) {
        return null
    }

    return (
        <div className={typeOf}>
            <strong>{message}</strong>
        </div>
    );
}

export default Notification;