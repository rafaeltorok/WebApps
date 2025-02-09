import PropTypes from 'prop-types';

function LoginForm({ handleLogin, username, setUsername, password, setPassword }) {
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
                          onChange={({ target }) => setUsername(target.value)}
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
                          onChange={({ target }) => setPassword(target.value)}
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
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm