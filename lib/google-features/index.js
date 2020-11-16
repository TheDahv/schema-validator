const Ajv = require('ajv');

const validator = new Ajv({
  $data: true,
  allErrors: false
});
require('ajv-keywords')(validator, 'formatMinimum');

const schemas = {
  Article: validator.compile(require('./article')),
};

const aliases = {
  BlogPosting: schemas.Article,
  NewsArticle: schemas.Article,
};

const validate = (data = {}) => {
  const type = data['@type'];
  const schema = aliases[type] || schemas[type];

  return {
    valid: schema(data),
    errors: schema.errors,
  };
};

module.exports = {
  schemas,
  validate,
  validator,
};
