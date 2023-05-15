async function getParts( connection ){
    return connection.execute(`select * from parts`);
}

async function upsertPart( connection,obj ){
    var sql = ` BEGIN 
                upsertPart(:partId,:price,:description); 
                END;`;
    await connection.execute(sql,obj);
}

module.exports.getParts = getParts;
module.exports.upsertPart = upsertPart;