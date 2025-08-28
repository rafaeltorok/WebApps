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
                          id='username'
                          type="text"
                          value={username}
                          name="Username"
                          data-testid='username'
                          onChange={handleUsernameChange}
                      />
                  </td>
                </tr>
                <tr>
                  <th>password</th>
                  <td>
                      <input
                          id='password'
                          type="password"
                          value={password}
                          name="Password"
                          data-testid='password'
                          onChange={handlePasswordChange}
                      />
                  </td>
                </tr>
                <tr>
                  <th colSpan={2}><button id="login-button" type="submit">login</button></th>
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