import React, { Fragment } from "react";
import { UserConsumer } from "../User-Context/User-Context";
import { NavLink } from "react-router-dom";
import { Fade } from "react-reveal";

const NavBar = ({ isAdmin, isLoggedIn, logout }) => {
  return (
    <header id="header">
      <nav id="navigation">
        <Fragment>
          <Fragment>
            <Fragment>
              <Fragment>
                {isAdmin ? (
                  <NavLink id="greeting-message" to="/">
                    <strong>My Wedding Buddy.</strong>
                  </NavLink>
                ) : (
                  <NavLink id="greeting-message" to="/user/wedding-homepage">
                    <strong>My Wedding Buddy.</strong>
                  </NavLink>
                )}
              </Fragment>
            </Fragment>
            <div id="nav-container">
              {isLoggedIn ? (
                <Fragment>
                  {isAdmin ? (
                    <Fade right>
                      <div className="admin-navigation">
                        <div className="wrapper-inner-tab-backgrounds">
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/" onClick={logout}>
                                <span>Logout</span>
                              </NavLink>
                            </div>
                          </div>
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/admin/all">
                                <span>All weddings</span>
                              </NavLink>
                            </div>
                          </div>
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/admin/create">
                                <span>New Wedding</span>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fade>
                  ) : (
                    <Fade right>
                      <div className="user-navigation">
                        <div className="wrapper-inner-tab-backgrounds">
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/" onClick={logout}>
                                <span>Logout</span>
                              </NavLink>
                            </div>
                          </div>
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/guest-list/create">
                                <span>Add guest</span>
                              </NavLink>
                            </div>
                          </div>
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/guest-list/all">
                                <span>Guest List</span>
                              </NavLink>
                            </div>
                          </div>
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/">
                                <span>Gallery</span>
                              </NavLink>
                            </div>
                          </div>
                          <div className="wrapper-inner-tab-background">
                            <div className="sim-button button11">
                              <NavLink to="/user/wedding-homepage">
                                <span>My Profile</span>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fade>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <Fade right>
                    <div className="unlogged-user">
                      <div className="wrapper-inner-tab-backgrounds">
                        <div className="wrapper-inner-tab-background">
                          <div className="sim-button button11">
                            <NavLink to="/">
                              <span>Gallery</span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="wrapper-inner-tab-background">
                          <div className="sim-button button11">
                            <NavLink to="/">
                              <span>Who are we</span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="wrapper-inner-tab-background">
                          <div className="sim-button button11">
                            <NavLink to="/">
                              <span>Our purpose</span>
                            </NavLink>
                          </div>
                        </div>
                        <div className="wrapper-inner-tab-background">
                          <div className="sim-button button11">
                            <NavLink to="/login">
                              <span>Login</span>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fade>
                </Fragment>
              )}
            </div>
          </Fragment>
        </Fragment>
      </nav>
    </header>
  );
};
const NavBarWithContext = props => {
  return (
    <UserConsumer>
      {({ isLoggedIn, isAdmin }) => (
        <NavBar {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      )}
    </UserConsumer>
  );
};
export default NavBarWithContext;
