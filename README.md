# Schema.org Validation

Just some explorations on what exists to help site authors use schema.org
effectively. When it comes to validation, there are a few helpful meanings:

- is it correctly formatted and parseable in the implementation format (e.g., JSON-LD, Microdata, etc.)?
- does each field use its expected type
- for purposes of leveraging search engine features -- like Google -- are all
  required fields present, and are relationships and type specificity employed
  correctly

Each level of validation gets increasingly more sophisticated -- there's a
difference between "is it technically correct" and "did you use this in the most
optimal way for your goal".

This plays with a few libraries that already exist as well as demonstrate some
ways to capture more sophisticated "business rules" and recommendations into
machine-readable formats.

Note, this makes use of a git submodule to bring in a dependency from a [nascent
Google project](https://github.com/google/schemarama). This isn't meant to be a
shared library project so I'm not adding a lot of contributor-friendly material
I would otherwise.

Relevant links:

- [https://schema.org/docs/full.html](https://schema.org/docs/full.html)
- [https://github.com/schemaorg/schemaorg](https://github.com/schemaorg/schemaorg)
- [https://github.com/google/schemarama](https://github.com/google/schemarama)
- [https://www.w3.org/TR/shacl/](https://www.w3.org/TR/shacl/)
- [https://developers.google.com/search/docs/guides/search-gallery](https://developers.google.com/search/docs/guides/search-gallery)
