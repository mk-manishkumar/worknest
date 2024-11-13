import UserModel from "../models/User.model.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, location } = req.body;

  if (!name || !email || !location) next("Please provide all fields");

  const user = await UserModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.email = email;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(200).json({
    user,
    token,
  });
};

// GET USER DATA
export const getUserController = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.user.userId });
    user.password = undefined;

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth Error",
      success: false,
      error: error.message,
    });
  }
};
