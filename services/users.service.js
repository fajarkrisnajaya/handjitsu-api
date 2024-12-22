const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users.repository");
const { generateAccessToken } = require("../utils/auth.util");

const createUser = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);

  if (user.rows.length > 0) {
    throw new Error("user already exist");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = { 
    email: userData.email,
    username: userData.username,
    password: hashedPassword,
    avatar_url: userData.avatar_url
  };

  user = await userRepository.createUser(newUser);
  return user;
};

const login = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);

  if (user.rows.length === 0) {
    throw new Error(404);
  }

  const isPasswordMatched = await bcrypt.compare(
    userData.password,
    user.rows[0].password
  );

  if (!isPasswordMatched) {
    throw new Error(401);
  }

  const token = generateAccessToken({ email: userData.email, id: user.rows[0].id });

  return token;
};

const getUserById = async (id) => {
  let user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};

const topup = async (id, amount) => {
  let user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error("user not found");
  }
  user.balance = parseInt(user.balance, 10); // Ensure balance is an integer
  amount = parseInt(amount, 10); // Ensure amount is an integer
  user.balance += amount;
  await userRepository.updateUserBalance(id, user.balance);
  return user;
};

module.exports = { createUser, getUserById, login, topup };