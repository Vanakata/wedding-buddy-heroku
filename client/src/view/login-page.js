import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthenticationService from "../components/services/authentication-service";
import { UserConsumer } from "../components/User-Context/User-Context";
import Fade from "react-reveal/Fade";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  static service = new AuthenticationService();

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const { updateUser } = this.props;
    const credentials = {
      username: username.toLowerCase(),
      password
    };
    this.setState(
      {
        error: ""
      },
      async () => {
        try {
          const result = await Login.service.login(credentials);

          if (!result.success) {
            const errors = Object.values(result.errors).join(" ");
            throw new Error(errors);
          }
          window.localStorage.setItem("auth_token", result.token);
          window.localStorage.setItem(
            "user",
            JSON.stringify({
              ...result.user,
              isLoggedIn: true,
              isAdmin: result.user.roles[0] === "admin"
            })
          );

          updateUser({
            isLoggedIn: true,
            isAdmin: result.user.roles[0] === "admin",
            ...result.user
          });
        } catch (error) {
          alert("Invalid username or password");
        }
      }
    );
  };
  render() {
    const { username, password } = this.state;
    const { isLoggedIn, isAdmin } = this.props;

    if (isLoggedIn) {
      if (isAdmin) {
        return <Redirect to="/admin/all" />;
      } else {
        return <Redirect to="/user/wedding-homepage" />;
      }
    } else {
      return (
        <Fade left cascade>
          <div id="login-container">
            <form onSubmit={this.handleSubmit}>
              <div className="login-text">
                <h1>Login</h1>
                <label className="login-input">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={this.handleChange}
                  className="login-input"
                />
                <div>
                  <label className="login-input">Password:</label>
                  <input
                    type="password"
                    name="password"
                    id="password-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={this.handleChange}
                    className="login-input"
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    value="Login"
                    className="login-input-btn"
                  />
                </div>
              </div>
            </form>
          </div>
        </Fade>
      );
    }
  }
}

const LoginWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn, updateUser, isAdmin }) => (
        <Login
          {...props}
          isLoggedIn={isLoggedIn}
          updateUser={updateUser}
          isAdmin={isAdmin}
        />
      )}
    </UserConsumer>
  );
};
export default LoginWithContext;
