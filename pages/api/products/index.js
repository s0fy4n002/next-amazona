import nc from 'next-connect';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import cors from 'cors';

const handler = nc();

handler.use(cors({ origin: 'http://127.0.0.1:3000', methods: ['POST'] }));

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();

  res.send(products);
});

export default handler;
