const { expect } = require('chai');
const { validate } = require('../index');

describe('Article', function () {
  describe('with a valid AMP article', function () {
    it('should return no errors', function () {
      const data = JSON.parse(`
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://google.com/article"
          },
          "headline": "Article headline",
          "image": [
            "https://example.com/photos/1x1/photo.jpg",
            "https://example.com/photos/4x3/photo.jpg",
            "https://example.com/photos/16x9/photo.jpg"
           ],
          "datePublished": "2015-02-05T08:00:00+08:00",
          "dateModified": "2015-02-05T09:20:00+08:00",
          "author": {
            "@type": "Person",
            "name": "John Doe"
          },
           "publisher": {
            "@type": "Organization",
            "name": "Google",
            "logo": {
              "@type": "ImageObject",
              "url": "https://google.com/logo.jpg"
            }
          }
        }
      `);

      const { valid, errors } = validate(data);
      expect(valid).to.eq(true);
      expect(errors).to.be.null;
    });
  });
  describe('with an AMP article with early dateModified', function () {
    it('should error on dateModified', function () {
      const data = JSON.parse(`
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://google.com/article"
          },
          "headline": "Article headline",
          "image": [
            "https://example.com/photos/1x1/photo.jpg",
            "https://example.com/photos/4x3/photo.jpg",
            "https://example.com/photos/16x9/photo.jpg"
           ],
          "datePublished": "2015-02-05T08:00:00+08:00",
          "dateModified": "2015-01-03T09:20:00+08:00",
          "author": {
            "@type": "Person",
            "name": "John Doe"
          },
           "publisher": {
            "@type": "Organization",
            "name": "Google",
            "logo": {
              "@type": "ImageObject",
              "url": "https://google.com/logo.jpg"
            }
          }
        }
      `);

      const { valid, errors } = validate(data);
      expect(valid).to.eq(false);
      expect(errors).to.not.be.empty;
      const error = errors.find(({ dataPath }) => dataPath === '.dateModified');
      expect(error).to.not.be.undefined;
    });
  });
  describe('with an AMP article with missing author', function () {
    it('should author error', function () {
      const data = JSON.parse(`
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://google.com/article"
          },
          "headline": "Article headline",
          "image": [
            "https://example.com/photos/1x1/photo.jpg",
            "https://example.com/photos/4x3/photo.jpg",
            "https://example.com/photos/16x9/photo.jpg"
           ],
          "datePublished": "2015-02-05T08:00:00+08:00",
          "dateModified": "2015-02-06T09:20:00+08:00",
           "publisher": {
            "@type": "Organization",
            "name": "Google",
            "logo": {
              "@type": "ImageObject",
              "url": "https://google.com/logo.jpg"
            }
          }
        }
      `);

      const { valid, errors } = validate(data);
      expect(valid).to.eq(false);
      expect(errors).to.not.be.empty;
      const error = errors.find(({ keyword }) => keyword === 'required');
      expect(error).to.not.be.undefined;
    });
  });
});
