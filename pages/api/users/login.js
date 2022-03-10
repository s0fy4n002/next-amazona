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
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    return res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  res.status(401).send({ message: 'Invalid user or password' });
});

export default handler;
