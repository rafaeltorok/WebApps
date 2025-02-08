import PropTypes from 'prop-types';

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

Notification.propTypes = {
    message: PropTypes.string.isRequired
}

export default Notification;