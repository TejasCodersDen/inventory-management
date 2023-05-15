// myscript.js
// This example uses Node 8's async/await syntax.

require('dotenv').config();
customersRepository = require("./customer");
const path = require('node:path');

const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
console.log(process.env.USER);
function initConnection() {
   return oracledb.getConnection( {
      user          : process.env.USER,
      password      : process.env.PASSWORD,
      connectString : process.env.CONNECTION_STRING,
    });
}

module.exports.initConnection = initConnection;