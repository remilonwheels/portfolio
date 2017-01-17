#!/usr/bin/env node

const db = require('../lib/loadDB')
const fail = () => process.exit(1)
const success = () => process.exit(0)
const help = () => {
  console.log(`
    LoadArticles v1.0.0

    A simple node script which takes a JSON file of articles and populates them
    inside of a postgres database.

    Usage: loadarticles
      Loads from a default JSON file, located in the /data directory

    Program exits successfully if database records are created without Error.

    If Error is present program exits failure.
  `)
}

function main () {
  db.createTableAuthor()
  .then(db.createTableArticle)
  .then(() => db.loadAuthors('projects.json'))
  .then(() => db.loadArticles('projects.json'))
  .then(() => success())
  .catch(err => {
    help()
    fail()
    console.error(err)
  })
}

main()
