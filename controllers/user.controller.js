const User = require('../models/user.model.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config.js');

exports.login = (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role },
        config.secretKey,
        { expiresIn: "1h" } //1h to expire
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        role: fetchedUser.role
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
}
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      role: req.body.role,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
};

exports.getUser = (req, res) => {
  User.findOne({ email: req.params.email})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with email " + req.params.email
            });            
        }
        const response = {
          email: user.email,
          role: user.role
        }
        res.send(response);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with email " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with email " + req.params.email
        });
    });
    // Request validation
};


exports.editUser = (req, res) => {
  User.findOneAndUpdate({email: req.params.email}, {
    email: req.body.email,
    role: req.body.role
}, {new: false})
.then(user => {
    if(!user) {
        return res.status(404).send({
            message: "user not found with id " + req.params.email
        });
    }
    const response = {
      email: user.email,
      role: user.role
    }
    res.send(response);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "User  not found with email " + req.params.email
        });                
    }
    return res.status(500).send({
        message: "Something wrong updating note with email " + req.params.email
    });
});
}

exports.deleteUser = (req, res) => {
  User.findOneAndRemove({email: req.params.email})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.email
          });
      }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.email
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + req.params.email
      });
  });
};