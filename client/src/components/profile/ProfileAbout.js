import React, { Component } from "react";
import isEmpty from "../../validation/isEmpty";
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //get only fist name
    const firstName = profile.user.name.trim().split(" ")[0];

    //skill list

    const skill = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check primary-color" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body profile-about mb-3">
            <h3 className="text-center primary-color">{firstName}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <p className="text-center">{firstName} Do not have a Bio</p>
              ) : (
                profile.bio
              )}
            </p>
            <hr />
            <h3 className="text-center primary-color">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skill}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
