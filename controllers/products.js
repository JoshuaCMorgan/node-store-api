const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  // https://mongoosejs.com/docs/queries.html
  const products = await Product.find({}).limit(1);

  res.status(200).json({
    products,
    nbHits: products.length,
  });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, limit } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex
    queryObject.name = { $regex: name, $options: 'i' };
  }

  // gives us Query object from Mongoose
  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // limit
   if (limit) {
    result = result.limit(Number(limit))
   }

  const products = await result;

  res.status(200).json({
    products,
    nbHits: products.length,
  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
