// https://developers.google.com/search/docs/data-types/article#amp
module.exports = {
  '$id': 'https://schema.org/Article',
  type: 'object',
  required: ['author', 'datePublished', 'headline', 'image', 'publisher'],
  properties: {
    // TODO create Person or Organization schemas and use that
    author: {
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    },
    datePublished: {
      type: 'string',
      format: 'date-time'
    },
    dateModified: {
      type: 'string',
      format: 'date-time',
      formatMinimum: { $data: '1/datePublished' }
    },
    'headline': {
      type: 'string',
      maxLength: 110
    },
    image: {
      type: 'array',
      items: [
        { type: 'string', format: 'uri' }
      ]
    },
    publisher: {
      type: 'object',
      required: ['logo', 'name'],
      properties: {
        // TODO write schema for ImageObject
        logo: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              format: 'uri'
            }
          }
        },
        name: { type: 'string' }
      }
    },
    mainEntityOfPage: {
      type: 'object',
      properties: {
        '@type': { type: 'string' },
        '@id': { type: 'string' }
      }
    }
  }
};
