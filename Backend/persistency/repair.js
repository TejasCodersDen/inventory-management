
// call new_repair('16507326291',1,'H',10,partsId(2));
async function newRepair( connection,obj ){
    try{
    var sql = ` BEGIN 
                new_repair(${obj.phoneNo},${obj.machineId},'${obj.serviceType}',${obj.fee},partsId(${obj.partsId.join(',')})); 
                END;`;

    await connection.execute(sql);
    }
    catch(e){
        throw(e);
    }
}

module.exports.newRepair = newRepair;