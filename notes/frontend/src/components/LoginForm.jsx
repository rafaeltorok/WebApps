import PropTypes from 'prop-types';

function LoginForm({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) {
    return (
        <div className='login-table'>
          <form onSubmit={handleLogin}>
            <table>
              <tbody>
                <tr>
                  <th>username</th>
                  <td>
                      <input
                          type="text"
                          value={username}
                          name="Username"
                          onChange={handleUsernameChange}
                      />
                  </td>
                </tr>
                <tr>
                  <th>password</th>
                  <td>
                      <input
                          type="password"
                          value={password}
                          name="Password"
                          onChange={handlePasswordChange}
                      />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}><button className="login-button" type="submit">login</button></th>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired
}

export default LoginForm