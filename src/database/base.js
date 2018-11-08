const sqlite = require('sqlite3');

global.sqliteDb = null;

const promisify = (res, rej) => (err, value) => {
  if (err) { return rej(err); }
  return res(value);
};

const createDatabase = (dbFile = process.env.SQLITE_DB) => (
  new Promise((res, rej) => {
    const db = new sqlite.Database(dbFile, (err) => {
      if (err) {
        return rej(err);
      }

      return res(db);
    });
  })
);

const getDatabase = () => {
  if (!global.sqliteDb) {
    global.sqliteDb = createDatabase();
  }
  return global.sqliteDb;
};

const run = (sql, params) => (
  getDatabase()
  .then((db) => (
    new Promise((res, rej) => (
      db.run(sql, params, promisify(res, rej))
    ))
  ))
);

const get = (sql, params) => (
  getDatabase()
  .then((db) => (
    new Promise((res, rej) => (
      db.get(sql, params, promisify(res, rej))
    ))
  ))
);

const all = (sql, params) => (
  getDatabase()
  .then((db) => (
    new Promise((res, rej) => (
      db.all(sql, params, promisify(res, rej))
    ))
  ))
);

module.exports = {
  run,
  get,
  all,
};
