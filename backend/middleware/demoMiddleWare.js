const Demo = (req, res, next) => {
  console.log(req.path);

  next();
};


module.exports = Demo;
