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

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) next("Please provide email and password both.");

  // find user by email
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) next("Invalid credentials");

  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) next("Invalid Email and Password");

  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};
