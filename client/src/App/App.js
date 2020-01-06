import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  defaultUserState,
  UserProvider
} from "../components/User-Context/User-Context";
import NavBar from "../components/Nav-Bar/NavBar";
import Login from "../view/login-page";
import AuthorizeRoute from "../components/routes/Authorized-Route";
import UserHomePage from "../view/user/user-home-page";
import CreateWedding from "../view/admin/create-wedding-page";
import AllWeddings from "../view/admin/get-all-weddings-page";
import WeddingDetails from "../view/admin/wedding-details-page";
import GuestList from "../view/user/guest-list/guest-list-page";
import CreateGuestList from "../view/user/guest-list/create-guest-list";
import AdminRoute from "../components/routes/Admin-Route";
import "filepond/dist/filepond.min.css";
import "../css/style.css";
import "../css/mobile-phones.css";
import "../css/tablet-portait.css";
import "../css/tablet-landscape.css";
import "../css/regular-monitors.css";
import "../css/ultra-wide.css";

class App extends Component {
  constructor(props) {
    super(props);

    const localUser = window.localStorage.getItem("user");
    let parsedUser = localUser ? JSON.parse(localUser) : {};

    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser,
        updateUser: this.updateUser
      }
    };
  }
  updateUser = user => {
    this.setState({ user });
  };
  logout = () => {
    window.localStorage.clear();
    this.setState({
      user: {
        ...defaultUserState,
        updateUser: this.updateUser
      }
    });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        {
          <Router>
            <Fragment>
              <UserProvider value={user}>
                <NavBar logout={this.logout} />
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <AdminRoute
                    exact
                    path="/admin/create"
                    component={CreateWedding}
                  />
                  <AdminRoute exact path="/admin/all" component={AllWeddings} />
                  <AdminRoute
                    exact
                    path="/admin/all/:id"
                    component={WeddingDetails}
                  />
                  <AuthorizeRoute
                    exact
                    path="/user/wedding-homepage"
                    component={UserHomePage}
                  />
                  <AuthorizeRoute
                    exact
                    path="/guest-list/all"
                    component={GuestList}
                  />
                  <AuthorizeRoute
                    exact
                    path="/guest-list/create"
                    component={CreateGuestList}
                  />
                </Switch>
              </UserProvider>
            </Fragment>
          </Router>
        }
      </div>
    );
  }
}

export default App;
