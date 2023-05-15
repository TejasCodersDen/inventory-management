const oracle = require("./persistency/oracleConnection");
const customerRepo = require("./persistency/customer");
const partsRepo = require("./persistency/part");
const machinesRepo = require("./persistency/machines");
const contractsRepo = require("./persistency/contracts");
const repairRepo = require("./persistency/repair");
const invoiceRepo = require("./persistency/invoice");

module.exports = function (app) {


  app.get("/customer", async (req, res) => {
    // #swagger.description = Get List of Customers
    //  #swagger.tags = ['Customer']

    oracle.initConnection().then((a) => {
      customerRepo.getCustomers(a, req.query.term).then((x) => {
        res.send(x.rows);
      });
    });
  });


  app.put("/customer", async (req, res) => {
    // #swagger.description = Create or Update User
    // #swagger.tags = ['Customer']
    //#swagger.parameters = [{"name":"customer","in":"body",schema:{"name":"string","phoneNo":"string","address":"string"}}]
    console.log(req.body);
    oracle.initConnection().then((a) => {
      customerRepo.putCostumer(a, req.body).then((x) => {
        res.send("Ok");
      });
    });
  });

  app.get("/parts", async (req, res) => {
    // #swagger.description =Get Parts
    // #swagger.tags = ['Parts']
    oracle.initConnection().then((a) => {
      partsRepo.getParts(a, req.query.term).then((x) => {
        res.send(x.rows);
      });
    });
  });

  app.put("/parts", async (req, res) => {
    // #swagger.description = Create or Update Parts
    // #swagger.tags = ['Parts']
    oracle.initConnection().then((a) => {
      partsRepo.upsertPart(a, req.body).then((x) => {
        res.send("OK");
      });
    });
  });

  app.get("/machines", async (req, res) => {
    // #swagger.description =Get Machines
    // #swagger.tags = ['Machines']
    oracle.initConnection().then((a) => {
      machinesRepo.getMachines(a).then((x) => {
        res.send(x.rows);
      });
    });
  });

  app.put("/machines", async (req, res) => {
    // #swagger.description =Create or Update Machines
    // #swagger.tags = ['Machines']
    oracle.initConnection().then((a) => {
      machinesRepo.upsertMachine(a, req.body).then((x) => {
        res.send(x);
      });
    });
  });

  app.put("/contracts", async (req, res) => {
    // #swagger.description =Create Service Contracts
    // #swagger.tags = ['Contracts']
    oracle.initConnection().then((a) => {
      contractsRepo.createContract(a, req.body).then((x) => {
        res.send(x);
      },(e) => {res.status(500); res.send();});
    });
  });

  app.get("/contracts", async (req, res) => {
    // #swagger.description =Get Contracts
    // #swagger.tags = ['Contracts']
    oracle.initConnection().then((a) => {
      contractsRepo.getContracts(a).then((x) => {
        res.send(x.rows);
      });
    });
  });

  app.put("/repair", async (req, res) => {
    // #swagger.description =Create Repair Jobs
    // #swagger.tags = ['Repair Jobs']
    console.log("Aqui");
    oracle.initConnection().then((a) => {
      repairRepo.newRepair(a, req.body).then((x) => {
        res.send(x);
      },(e) => {res.status(500); res.send(e);});
    });
  });


  app.get("/invoice", async (req, res) => {
    // #swagger.description = Get Invoice From certain Custoemr
    // #swagger.tags = ['Invoice']
    oracle.initConnection().then((a) => {
      invoiceRepo.getInvoice(a,req.query).then((x) => {
        res.send(x.rows);
      });
    });
  });

};
