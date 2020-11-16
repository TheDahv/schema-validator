// https://developers.google.com/search/docs/data-types/book
module.exports = {
  '$id': 'https://schema.org/Book',
  type: 'object',
  properties: {
    // TODO create Person or Organization schemas and use that
    author: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    },
    name: { type: 'string' },
    url: {
      type: 'string',
      format: 'uri'
    },
    //workExample: { }
    sameAs: {
      type: 'string',
      format: 'uri'
    },
  }
};
