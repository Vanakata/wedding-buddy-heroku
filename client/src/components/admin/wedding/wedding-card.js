import React, { Component } from "react";
import { UserConsumer } from "../../User-Context/User-Context";
import { Link } from "react-router-dom";

class WeddingCard extends Component {
  render() {
    const { wedding } = this.props;
    if (wedding.roles[0] === "admin") {
      return null;
    } else {
      return (
        <div className="wedding">
          <div id="wedding-name">
            <Link to={`/admin/all/${wedding._id}`}>
              <h5>{wedding.username}</h5>
            </Link>
          </div>
        </div>
      );
    }
  }
}

const WeddingCardWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn, isAdmin }) => (
        <WeddingCard {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      )}
    </UserConsumer>
  );
};
export default WeddingCardWithContext;
