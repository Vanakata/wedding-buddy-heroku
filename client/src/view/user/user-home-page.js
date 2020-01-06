import React from "react";
import { UserConsumer } from "../../components/User-Context/User-Context";
import UserService from "../../components/services/user-service";
import UserHomePageCard from "../../components/user/user-homepage-card";

class UserHomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wedding: {}
    };
  }
  static service = new UserService();
  render() {
    const wedding = this.state;

    if (wedding === undefined) {
      return (
        <div>
          <h2>Wedding does not exists.</h2>
        </div>
      );
    }
    return (
      <div className="homepage-container">
        <UserHomePageCard key={wedding.wedding._id} wedding={wedding.wedding} />
      </div>
    );
  }
  async componentDidMount() {
    try {
      const weddingArray = await UserHomePage.service.getUserWedding();
      let wedding = weddingArray[0];

      this.setState({ wedding });
    } catch (error) {
      console.log(error);
    }
  }
}
const UserHomePageWithCotext = props => {
  return (
    <UserConsumer>
      {({ username, isLoggedIn, isAdmin }) => (
        <UserHomePage
          {...props}
          username={username}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
        />
      )}
    </UserConsumer>
  );
};
export default UserHomePageWithCotext;
