import React, { Component } from "react";
import { UserConsumer } from "../../../components/User-Context/User-Context";
import GuestListService from "../../../components/services/guest-list-service";
import Fade from "react-reveal";

class CreateGuestList extends Component {
  constructor(props) {
    super(props);
    const wedding = JSON.parse(localStorage.user);
    this.state = {
      firstName: "",
      lastName: "",
      error: "",
      weddingId: wedding.id,
      isCreated: false
    };
  }
  static service = new GuestListService();

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let { firstName, lastName, weddingId } = this.state;
    const credentials = { firstName, lastName, weddingId };

    this.setState(
      {
        error: ""
      },
      async () => {
        try {
          const result = await CreateGuestList.service.create(credentials);
          if (!result.success) {
            const errors = Object.values(result.errors).join(" ");
            throw new Error(errors);
          }
          this.setState({
            isCreated: true,
            firstName: "",
            lastName: ""
          });
          setTimeout(() => {
            this.setState({
              isCreated: false
            });
          }, 3000);
        } catch (error) {
          alert("Something went wrong.Please check your input.");
        }
      }
    );
  };

  render() {
    let { firstName, lastName } = this.state;

    return (
      <div className="create-guest-container">
        <h1>Here you can add guests to your list: </h1>
        <div className="create-guest">
          <form onSubmit={this.handleSubmit}>
            <label>First name:</label>
            <br />

            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={this.handleChange}
              className="guest-names"
            />
            <br />

            <label>Last name:</label>
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={this.handleChange}
              className="guest-names"
            />
            <input
              type="submit"
              value="Create"
              className="create-guest-button"
            />
          </form>
        </div>
        {this.state.isCreated ? (
          <Fade right>
            <div className="success-message">
              <p>Guest added successfully</p>
            </div>
          </Fade>
        ) : null}
      </div>
    );
  }
}
const CeateGuestListWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn }) => (
        <CreateGuestList {...props} isLoggedIn={isLoggedIn} />
      )}
    </UserConsumer>
  );
};
export default CeateGuestListWithContext;
