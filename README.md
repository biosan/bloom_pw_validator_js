# Javascript Password Validator

A simple JS password validator that use a Bloom Filter.



## Why

The idea behind this project is to build a simpler and client-side version of [*"have I been pwned"*](https://haveibeenpwned.com). A Bloom Filter is obviously the best data structure to implement it.

[*"HIBP"*](https://haveibeenpwned.com) store millions of pawned passwords and provide a very clever and privacy friendly API, but I wanted a client-side only solution, and obviously sending and storing all that data is impossible.

Instead, storing the most common 10K passwords in Bloom Filter and sending them is easy and provide a useful protection against the use of common passwords.



## How it works

Read more about [Bloom Filters at Wikipedia]()

The script `builder.js` create a Bloom Filter, insert all the passwords inside the `password.txt` file and then return it as a simple JSON.

At this point the JSON file must be manually copied inside an HTML page or a JS script and then `validate.js` will provide you a simple way to import it and to validate the passwords in your forms.

> This process will soon be automated using Webpack or Gulp to create a simple self-contained JS file like `validator.10K.min.js` (will check against the 10K most common passwords) or `validator.1K.min.js`


## How to use it

Untill I write a good documentations use `test_page.html` as example

### Testing

`npm test` or `yarn test`



## Warnings!

This only a simple side project built to improve my Javascript skills and learn how to deliver a JS library correctly.

Exactly like a Bloom Filter, this validator will only tell you if a password is with a **certain probability inside the filter** or **definetly not inside it**, so positive matches are probaly true and negative matches are absolutely true.

The probability of false-positive is depends on the number of items in the filter, the number of hash functions used and the size of the filter in bits.

In the future I plan to improve the process to choose this parameters when using the builder.