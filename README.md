# words-api
A random word form generator. Generates a random noun, adjective, or animal via a GET request. Live at https://random-word-form.herokuapp.com. 

Runs on a free Heroku dyno, so upon making a request, it may take a couple of seconds for the dyno to wake up. 

Inspired by [https://random-word-api.herokuapp.com](https://random-word-api.herokuapp.com/home/), a random word generator. 

## Usage
Send a GET request to the following to generate a random...
* Noun: [`/random/noun`](https://random-word-form.herokuapp.com/random/noun)
* Adjective: [`/random/adjective`](https://random-word-form.herokuapp.com/random/adjective)
* Animal: [`/random/animal`](https://random-word-form.herokuapp.com/random/animal)

To generate a word starting with a specific letter, append `/letter` to the above urls.

Sample call: [`/random/noun/a`](https://random-word-form.herokuapp.com/random/noun/a)

To get a certain number of words, append <code>?count=N</code> to the above urls.

Sample calls: [`/random/noun/a?count=3`](https://random-word-form.herokuapp.com/random/noun/a?count=3), [`/random/noun?count=5`](https://random-word-form.herokuapp.com/random/noun?count=5)

While functional, the site is a work in progress.
