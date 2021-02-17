const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    type: {
      type: String,
      enum: ["CUSTOMER", "DRIVER", "STORE_OWNER", "ADMIN"],
      default: "CUSTOMER",
      required: false,
    },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("users", UserSchema,"users",false);

function getUserDocument(req, res, next) {
  User.findOne({ id: req.params.id }, (err, user) => {
    if (err || !user) {
      res.status("400").json({ status: "user-missing" });
    }
    req.userDocument = user;
    next();
  });
}

module.exports = { UserSchema, User, getUserDocument };
