const express = require("express");
const router = express.Router();
const passport = require("passport");

//load User model
const User = require("../../models/User");
//load profile model
const Profile = require("../../models/Profile");

//import profile validation
const validateProfileInput = require("../../validation/profile");
//import profile validation
const validateExperienceInput = require("../../validation/experience");
//import profile validation
const validateEducaionInput = require("../../validation/education");

// @route   GET apis/profile/test
//@desc     Test profile route
//@access   Public
router.get("/test", (req, res) => res.json({ mes: "profile is working" }));

// @route   GET apis/profile
//@desc     get current user profile
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST apis/profile
//@desc     create profile fields
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //get fields
    profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;

    if (req.body.company) profileFields.company = req.body.company;

    if (req.body.website) profileFields.website = req.body.website;

    if (req.body.location) profileFields.location = req.body.location;

    if (req.body.bio) profileFields.bio = req.body.bio;

    if (req.body.status) profileFields.status = req.body.status;

    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;

    //skills - splits into an aray
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //social
    profileFields.socials = {};
    if (req.body.youtube) profileFields.socials.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.socials.facebook = req.body.facebook;
    if (req.body.linkedIn) profileFields.socials.linkedIn = req.body.linkedIn;
    if (req.body.twitter) profileFields.socials.twitter = req.body.twitter;
    if (req.body.instagram)
      profileFields.socials.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //there is a profile so we update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //crete a new profile

        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "This handle already exists";
            res.status(404).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET apis/profile/all
//@desc     get all user profile
//@access   Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.handle = "There are no profiles ";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(() => res.json({ allProfiles: "There are no profiles" }));
});

// @route   GET apis/profile/handle/:handle
//@desc     get user profile by handlee
//@access   Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "There is no profile for this user";
        return res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @route   GET apis/profile/user/:user_id
//@desc     get user profile by user id
//@access   Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.handle = "There is no profile for this user";
        return res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(() => res.status(400).json({ profile: "this userId do not exist" }));
});

// @route   POST apis/profile/experience
//@desc     add experience to profile
//@access   Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //check validation
    if (!isValid) {
      //return error wih 404 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add exp to profile array
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);
// @route   POST apis/profile/education
//@desc     add education to profile
//@access   Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducaionInput(req.body);

    //check validation
    if (!isValid) {
      //return error wih 404 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add exp to profile array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);
// @route   DELETE apis/profile/experience/:exp_id
//@desc     delete experience from profile
//@access   Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        profile.experience.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);
// @route   DELETE apis/profile/education/edu_id
//@desc     remove  education from profile
//@access   Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice out of array
        profile.education.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);
// @route   DELETE apis/profile
//@desc     delete profile and user
//@access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
