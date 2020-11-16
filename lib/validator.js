const fs = require('fs')

const ShaclValidator = require('./schemarama/core/shaclValidator').Validator
const annotations = {
  description: 'http://www.w3.org/2000/01/rdf-schema#comment',
  severity: 'http://www.w3.org/2000/01/rdf-schema#label'
}

const fullShacl = fs
  .readFileSync(`${__dirname}/schemarama/demo/validation/shacl/full.shacl`)
  .toString()

const validator = new ShaclValidator(fullShacl, { annotations })

const businessExample = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  image: [
    'https://example.com/photos/1x1/photo.jpg',
    'https://example.com/photos/4x3/photo.jpg',
    'https://example.com/photos/16x9/photo.jpg'
  ],
  '@id': 'http://davessteakhouse.example.com',
  name: "Dave's Steak House",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '148 W 51st St',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10019',
    addressCountry: 'US'
  },
  review: {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '4',
      bestRating: '5'
    },
    author: {
      '@type': 'Person',
      name: 'Lillian Ruiz'
    }
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.761293,
    longitude: -73.982294
  },
  url: 'http://www.example.com/restaurant-locations/manhattan',
  telephone: '+12122459600',
  servesCuisine: 'American',
  priceRange: '$$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      //dayOfWeek: ['Monday', 'Tuesday'],
      dayOfWeek: 'https://schema.org/Monday',
      opens: '11:30:00',
      closes: '22:00:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      //dayOfWeek: ['Wednesday', 'Thursday', 'Friday'],
      dayOfWeek: 'https://schema.org/Wednesday',
      opens: '11:30:00',
      closes: '23:00:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'https://schema.org/Saturday',
      opens: '16:00:00',
      closes: '23:00:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'https://schema.org/Sunday',
      opens: '16:00:00',
      closes: '22:00:00'
    }
  ],
  menu: 'http://www.example.com/menu',
  acceptsReservations: 'True'
}

validator
  .validate(JSON.stringify(businessExample), { baseUrl: 'https://schema.org/' })
  .then(report => {
    report.failures.forEach(failure => console.table(failure))
  })
  .catch(error => console.error({ error }))
