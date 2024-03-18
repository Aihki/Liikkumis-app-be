import mysql from 'mysql2/promise';

const promisePool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  typeCast: function (field, next) {
    if (field.type === 'JSON') {
      const jsonString = field.string();
      return jsonString !== null ? JSON.parse(jsonString) : null;
    }
    return next();
  },
});

export default promisePool;
