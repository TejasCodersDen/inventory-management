async function getInvoice( connection,obj ){
    var sql = `select * from completesummary where phoneNo =${obj.phoneNo}`;
    return  connection.execute(sql);
}

module.exports.getInvoice = getInvoice;