import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActionDashboard from "./ProfileActionDashboard";
import Experience from "./Experience";
import Education from "./Education";

class MainDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onClickDelete(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if profile of logged in user is not empty
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="h4 text-left mt-4 mb-3">
              <span className="text-muted">Welcome </span>
              <Link
                to={`/profile/${profile.handle}`}
                className="primary-color lead"
              >
                <span> {user.name} </span>
              </Link>
            </p>
            <ProfileActionDashboard />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.onClickDelete.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        //user loggeed in has no profile
        dashboardContent = (
          <div>
            <p className="h4 text-muted text-center">Welcome {user.name} </p>
            <p className="lead">
              You are yet to setup a profile,please lets get started.
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-5">Dashboard</h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(MainDashboard);
