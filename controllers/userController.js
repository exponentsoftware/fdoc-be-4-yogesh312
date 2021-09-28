const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (password.length < 5) throw "Password must be atleast 6 characters long.";

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw "User with same email already exits.";

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
    phone,
    role
  });

  await user.save();

  res.json({
    message: "User [" + name + "] registered successfully!",
    user
    
  });
  //res.send(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw "Email and Password did not match.";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  // res.json({
  //   message: "User logged in successfully!",
  //   token,
  // });
  res.render('listHome',{
    title:"list Home"
  })
};
exports.logins = async (req, res) => {
  res.render('login', {
    title: "login"
  });
};

exports.registers = async (req, res) => {
  res.render('./register',{
    title:"register"
  });
}

exports.home = async (req, res) => {
  res.render('home',{
    title:"home"
  });
}