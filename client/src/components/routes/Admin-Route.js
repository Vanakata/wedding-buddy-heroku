import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "../User-Context/User-Context";

const AdminRoute = ({ isLoggedIn, roles, ...otherProps }) => {
  if (!isLoggedIn) {
    alert("Please login in");
    return <Redirect to="/login" />;
  }

  if (!roles.includes("admin")) {
    alert("You are not authorized to see this page");
    return <Redirect to="/" />;
  }

  return <Route {...otherProps} />;
};

const AdminRouteWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn, roles }) => (
        <AdminRoute {...props} isLoggedIn={isLoggedIn} roles={roles} />
      )}
    </UserConsumer>
  );
};

export { AdminRoute };
export default AdminRouteWithContext;
