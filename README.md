# Attuned

Attuned is an application that generates a Spotify playlist for you based on your current mood and energy level. Take the quiz and see what it recommends!

[Watch a demonstration](https://www.youtube.com/watch?v=0kypOs5DQJ4)

## App created with:
Node, Express, Postgres, Sequelize, React, React-Redux

## Prerequisites:
After forking and cloning the project, run 'npm install' to download all the necessary dependencies.

You will also need to create a file called `secrets.js` in the project root to store API keys for Spotify, Musixmatch, and Google's sentiment analysis.

  * This file is `.gitignore`'d, and will _only_ be required in your _development_ environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:
  ```
    process.env.SPOTIFY_CLIENT_ID = 'hush hush'
    process.env.SPOTIFY_CLIENT_SECRET = 'pretty secret'
    process.env.SPOTIFY_CALLBACK = '/auth/spotify/callback'
  ```

* To use OAuth with Spotify, complete the step above with a real client ID and client secret from Spotify

It is necessary to note that the free access option to the Musixmatch API limits the number of requests you can make per day and the amount of the lyrics. This app would function best with unrestricted and unlimited access to such and API.

## Getting started:
The command 'npm run start-dev' will run the app in development mode on your machine. To run the server and/or webpack separately, use 'npm run start-server' and 'npm run build-client.'

## Running tests:
All test files end with .spec.js. The command 'npm test' will run all tests for the project. You must have a database
