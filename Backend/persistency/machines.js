var moment = require('moment');
async function getMachines( connection ){
    return connection.execute(`select * from machine`);
}

async function upsertMachine( connection,obj ){

    obj.year = moment(obj.year).format('DD-MMM-yyyy');
    var sql = ` BEGIN 
                upsertMachine(:machineid,:parentId,:make,:model,:year,:type,:size); 
                END;`;
    try{
        await connection.execute(sql,obj);
        return "OK"
    }
    catch(e){
        return e.toString().split('\n')[0];
    }
}

module.exports.getMachines = getMachines;
module.exports.upsertMachine = upsertMachine;