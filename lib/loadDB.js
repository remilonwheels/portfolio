'use strict'

const Promise = require('bluebird')
const fsProm = Promise.promisifyAll(require('fs'))
const pg = require('pg')
const Pool = pg.Pool
const ops = module.exports = {}

const pool = new Pool({
  user: process.env.USER,
  password: '',
  host: 'localhost',
  database: process.env.USER,
  max: 10,
  idleTimeoutMillis: 1000
})

pool.on('error', e => console.error(e))

function SQL(parts, ...values) {
  return {
    text: parts.reduce((prev, curr, i) => `${prev}$${i}${curr}`),
    values
  };
}

const loadRecordProject = function(record) {
  return new Promise((res, rej) => {
    res(pool.query(SQL`
      INSERT INTO articles(
        project_id,
        project_name,
        project_section,
        date_begin,
        date_end,
        project_img,
        title_description,
        tags,
        gh_repo_name,
        site_link,
        code_score)
       VALUES(
         ${record.projectName},
         ${record.projectSection},
         ${record.dateBegin}
         ${record.dateEnd}
         ${record.projectIMG},
         ${record.titleDescription},
         ${record.tags},
         ${record.ghRepoName},
         ${record.siteLink},
         ${record.codeScore}
       )`))
    .catch(err => rej(err))
  })
}

ops.createTableProject = function() {
  return new Promise((res, rej) => {
    const sqlCreate =`
        CREATE TABLE IF NOT EXISTS
        projects (
          project_id SERIAL PRIMARY KEY,
          project_name VARCHAR(255) NOT NULL,
          project_section VARCHAR(15) NOT NULL,
          date_begin DATE,
          date_end DATE,
          project_img VARCHAR(255),
          title_description VARCHAR(255),
          tags JSONB,
          gh_repo_name VARCHAR(255),
          site_link VARCHAR(255),
          code_score JSONB
        );`

    res(
      pool.query(sqlCreate)
      .then(() => console.log('create projects success'))
      .catch(err => rej(err))
    )
  })
}

ops.loadProjects = (file) => {
  return fsProm.readFileAsync(`${__dirname}/../public/data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(records => records.map(loadRecordProject))
  .then(() => console.log('articles loaded successfully'))
  .then(proms => Promise.all(proms))
  .catch(err => console.error(err))
}
