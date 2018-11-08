const base = require('./base');

const upgradeMap = {
  '2018-11-07': `
    CREATE TABLE IF NOT EXISTS vehicle_stats (
      id VARCHAR(36) PRIMARY KEY
      , type TEXT
      , value INTEGER
      , timestamp INTEGER
    );
  `,
};

const runUpgrades = () => (
  Object.values(upgradeMap).reduce((prev, sql) => (
    prev.then(() => base.run(sql))
  ), Promise.resolve())
)

module.exports = {
  runUpgrades,
};
