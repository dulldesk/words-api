# words-api
A random word form generator. Generates a random noun, adjective, or animal via a GET request.

Inspired by [https://random-word-api.herokuapp.com](https://random-word-api.herokuapp.com/home/), a random word generator. 

## Usage
Send a GET request to the following to generate a random...
* Noun: `/random/noun`
* Adjective: `/random/adjective`
* Animal: `/random/animal`

To generate a word starting with a specific letter, append `/letter` to the above urls.

Sample call: `/random/noun/a`

To get a certain number of words, append <code>?count=N</code> to the above urls.

Sample call: `/random/noun/a?count=3`

While functional, the site is a work in progress.
