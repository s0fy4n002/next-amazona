import nc from 'next-connect';
import bcrypt from 'bcrypt';
import db from '../../../utils/db';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
});
handler.post(async (req, res) => {
  await db.connect();
  console.log(req.body);
  const existEmail = await User.findOne({ email: req.body.email }).exec();
  existEmail && res.status(500).send({ message: 'email sudah terdaftar' });
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: false,
  });
  const user = await newUser.save();
  if (!user) {
    res.status(401).send({ message: 'error' });
    return null;
  }
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  return null;
});

export default handler;
