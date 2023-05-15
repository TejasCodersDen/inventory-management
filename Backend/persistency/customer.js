async function getCustomers(connection, term) {
  return connection.execute(`select * from v_customer`);
}
async function upsertCustomer(connection, obj) {
  var sql = ` BEGIN 
                upsertCustomer(:a,:b,:c); 
                END;`;
  try {
    await connection.execute(sql, {
      a: obj.phoneNo,
      b: obj.name,
      c: obj.address,
    });
    return "OK";
  } catch (e) {
    return e.toString().split("\n")[0];
  }
}
module.exports.getCustomers = getCustomers;
module.exports.putCostumer = upsertCustomer;
