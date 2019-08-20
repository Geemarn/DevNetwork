import React, { Component } from "react";
import isEmpty from "../../validation/isEmpty";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { profile } = this.props;

    const expItems = profile.experience.map(exp => (
      <li key={exp._id} className="list-group-item profile-creds">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Present"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong className="primary-color">Position:</strong> {exp.title}
        </p>
        <p>
          {isEmpty(exp.location) ? null : (
            <span>
              <strong className="primary-color">Location: </strong>
              {exp.location}
            </span>
          )}
        </p>
        <p>
          {isEmpty(exp.description) ? null : (
            <span>
              <strong className="primary-color">Description: </strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = profile.education.map(edu => (
      <li key={edu._id} className="list-group-item profile-creds">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Present"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong className="primary-color">Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong className="primary-color">Field of Study:</strong>{" "}
          {edu.fieldOfStudy}
        </p>
        <p>
          {isEmpty(edu.description) ? null : (
            <span>
              <strong className="primary-color">Description: </strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center">Experience</h3>
          {expItems.length > 0 ? (
            <ul>{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Added</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center">Education</h3>
          {eduItems.length > 0 ? (
            <ul>{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Added</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileCreds;
