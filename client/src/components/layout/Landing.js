import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 landing--header--animated">
                  Developer Connector
                </h1>
                <p className="lead landing--para--animated">
                  {" "}
                  创建开发者信息, 分享信息并从其他开发者获得帮助
                </p>
                <hr />
                <Link
                  to="/register"
                  className="btn btn-lg btn-info mr-2 btn--animated"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn btn-lg btn-light btn--animated"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Landing.propTypes = {
//   auth: PropTypes.object.isRequired
// };

export default Landing;
