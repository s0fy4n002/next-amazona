import nc from 'next-connect';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import NextCors from 'nextjs-cors';

const handler = nc();

handler.get(async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['POST', 'DELETE'],
    origin: 'http://127.0.0.1:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  await db.connect();
  const products = await Product.find({});
  await db.disconnect();

  res.send(products);
});

export default handler;
