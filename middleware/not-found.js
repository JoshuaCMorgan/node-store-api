const notFound = (req, res) => {
  console.log('inside notFound');
  res.status(404).send('Route does not exist');
};

module.exports = notFound;
