const validate = (schema, property = "body") => (req, res, next) => {
  const { error } = schema.validate(req[property], {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = validate;