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

## SHACL Based Validation

[SHACL](https://www.w3.org/TR/shacl/) is a language for defining the expected
"shape" of a piece of data described by a RDF graph. Leveraging the
[Schemarama](https://github.com/google/schemarama) project, we can use the SHACL
files it has generated based on Schema.org specification documents to
programmatically generate validation.

You can see an example in use using some hard-coded Schema.org data in JSON-LD
format to represent a local business. Run the demo with `node
./lib/validator.js`.

This covers the 2nd layer of what "validation" means in terms of using expected
types for implemented fields.

## AJV Based Validation

This experiment is more manual and hand-rolled. Google publishes [advanced SEO
guides](https://developers.google.com/search/docs/guides/search-gallery) which
we can interpret as "business rules". We can then layer this on top of the 2nd
layer of validation to determine _optimal_ usage of Schema.org, where "optimal"
means targeting search engine features in Google.

[AJV](https://ajv.js.org/) lets us describe these rules as schemas that we can
apply when we encounter a matching type. This won't be exhaustive with respect
to the corpus of Schema.org definitions, but it does let us cover the subset of
business rules as defined by interpreting Google's guidelines.

You can see this in action in the `./lib/google-features/test/` folder.
