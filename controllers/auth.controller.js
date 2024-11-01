import UserModel from "../models/User.model.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validate
  if (!name) next("Name is required");
  if (!email) next("Email is required");
  if (!password) next("Password is required");

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) next("Email already registered, Please login.");

  const user = await UserModel.create({ name, email, password });

  const token = user.createJWT();

  res.status(201).send({
    success: true,
    message: "User created successfully.",
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
