import React from "react";
import { Redirect } from "react-router-dom";
import AuthenticationService from "../../components/services/authentication-service";
import { UserConsumer } from "../../components/User-Context/User-Context";

class CreateWedding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      weddingDate: "",
      groom: "",
      bride: "",
      bestMan: "",
      godmother: "",
      ceremonyPlace: "",
      ceremonyStart: "",
      ceremonyEnd: "",
      partyPlace: "",
      partyStart: "",
      partyEnd: "",
      error: "",
      isRegister: false
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
    const {
      email,
      username,
      password,
      confirmPassword,
      weddingDate,
      groom,
      bride,
      bestMan,
      godmother,
      ceremonyPlace,
      ceremonyStart,
      ceremonyEnd,
      partyPlace,
      partyStart,
      partyEnd
    } = this.state;

    const credentials = {
      email,
      username,
      password,
      confirmPassword,
      weddingDate,
      groom,
      bride,
      bestMan,
      godmother,
      ceremonyPlace,
      ceremonyStart,
      ceremonyEnd,
      partyPlace,
      partyStart,
      partyEnd
    };

    this.setState(
      {
        error: ""
      },
      async () => {
        try {
          if (credentials.password !== credentials.confirmPassword) {
            throw new Error("Password and Confirm-Password should match");
          }
          const result = await CreateWedding.service.register(credentials);
          if (!result.success) {
            const errors = Object.values(result.errors).join(" ");
            throw new Error(errors);
          }
          this.setState({
            isRegister: true
          });
        } catch (error) {
          alert(error.toString());
        }
      }
    );
  };
  render() {
    const {
      email,
      username,
      password,
      confirmPassword,
      weddingDate,
      error,
      isRegister,
      bestMan,
      godmother,
      ceremonyPlace,
      ceremonyStart,
      partyPlace,
      partyStart,
      groom,
      bride
    } = this.state;

    const { isLoggedIn } = this.props;

    if (isRegister || !isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="create-wedding-container">
        {error.length ? <div>Something went wrong:{error}</div> : null}
        <h1>Create new Wedding</h1>
        <form onSubmit={this.handleSubmit}>
          <div id="create-email" className="create-wedding">
            <label className="create-wedding-label">E-mail:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter user e-mail"
              value={email}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-username" className="create-wedding">
            <label className="create-wedding-label">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter valid username"
              value={username}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-password" className="create-wedding">
            <label className="create-wedding-label">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter valid password"
              value={password}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-confirm-passord" className="create-wedding">
            <label className="create-wedding-label">Confirm-Password:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-wedding-date" className="create-wedding">
            <label className="create-wedding-label">Wedding Date:</label>
            <input
              type="date"
              name="weddingDate"
              id="weddingDate"
              value={weddingDate}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-groom" className="create-wedding">
            <label className="create-wedding-label">Groom:</label>
            <input
              type="text"
              name="groom"
              id="groom"
              placeholder="Enter groom`s name"
              value={groom}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-bride" className="create-wedding">
            <label className="create-wedding-label">Bride:</label>
            <input
              type="text"
              name="bride"
              id="bride"
              placeholder="Enter bride`s name"
              value={bride}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-best-man" className="create-wedding">
            <label className="create-wedding-label">
              Best man<small>(optional)</small>:
            </label>
            <input
              type="text"
              name="bestMan"
              id="best-man"
              placeholder="Enter best man`s name"
              value={bestMan}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-godmother" className="create-wedding">
            <label className="create-wedding-label">
              Maid of honor<small>(optional)</small>:
            </label>
            <input
              type="text"
              name="godmother"
              id="godmother"
              placeholder="Enter godmother`s name"
              value={godmother}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-ceremony-place" className="create-wedding">
            <label className="create-wedding-label">
              Wedding Ceremony<small>(optional)</small>:
            </label>
            <input
              type="text"
              name="ceremonyPlace"
              id="ceremony-place"
              placeholder="Where will be the ceremony"
              value={ceremonyPlace}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-ceremony-duration" className="create-wedding">
            <label className="create-wedding-label">from:</label>
            <input
              type="time"
              name="ceremonyStart"
              placeholder="Beginng for ceremony"
              value={ceremonyStart}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <div id="create-party-place" className="create-wedding">
            <label className="create-wedding-label">
              Wedding party will be:
            </label>
            <input
              type="text"
              name="partyPlace"
              id="party-place"
              placeholder="Where will be the wedding party"
              value={partyPlace}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
          </div>
          <div id="create-party-duration" className="create-wedding">
            <label className="create-wedding-label">from:</label>
            <input
              type="time"
              name="partyStart"
              id="party-start"
              placeholder="Beginng for party"
              value={partyStart}
              onChange={this.handleChange}
              className="create-wedding-input"
            />
            <br />
          </div>
          <input type="submit" value="Create" id="create-wedding-button" />
        </form>
      </div>
    );
  }
}
const CreateWeddingWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn }) => <CreateWedding {...props} isLoggedIn={isLoggedIn} />}
    </UserConsumer>
  );
};
export default CreateWeddingWithContext;
