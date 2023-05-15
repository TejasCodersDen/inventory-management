var moment = require('moment');
async function getContracts(connection, term) {
    return connection.execute(`select * from Service_Contract`);
  }
  async function createContract(connection, obj) {
    obj.endDate = moment(obj.endDate).format('DD-MMM-yyyy');
    obj.startDate = moment(obj.startDate).format('DD-MMM-yyyy');
    obj.contractId = parseInt(obj.contractId);
    obj.machineId = parseInt(obj.machineId);
    var sql = ` BEGIN 
                  new_contract(:a,:b,:c,:d,:e,:f,:g); 
                  END;`;
    try {
      await connection.execute(sql, {
        a: obj.phoneNo,
        b: obj.contractId,
        c: obj.startDate,
        d: obj.endDate,
        e: obj.machineId,
        f: obj.serviceFee,
        g: obj.serviceType,
      });
      console.log(result);
      return result;
    } catch (e) {
      throw e.toString().split("\n")[0];
    }
  }
  module.exports.getContracts = getContracts;
  module.exports.createContract = createContract;