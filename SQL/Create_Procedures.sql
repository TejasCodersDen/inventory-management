create or replace type partsId  is table of number;
/

-- New Contract Procedure
create or replace procedure new_contract(cPhoneNo Varchar,cContractId number,startDate date,endDate date,cMachineId number,cFee number,cServiceType varchar) 
is
    exception_test EXCEPTION;
    PRAGMA exception_init( exception_test, -20001);
    machineExists number;
    contractExists number;
    machineIsCovered number := isMachineCovered(cMachineId,cServiceType);
    parentMachine number;
begin
    set transaction read write;
    checkCustomer(cPhoneNo);
    select count(*) into machineExists from Machine M where M.machineId = cMachineId;
    select count(*) into contractExists from Service_Contract SC where SC.contractId= cContractId;
    if cFee <= 0 then
        raise_application_error(-20001,'Fee cannot be less or equal to zero');
    end if;
    if machineIsCovered > 0 then
        raise_application_error(-20001,'Machine already attatched to a Service Contract.');
    end if;
    if contractExists < 1 then
        insert into Service_Contract (contractId,startDate,endDate,active,phoneNo) values(cContractId,startDate,endDate,1,cPhoneNo);
    end if;
    insert into Service_Item (contractId,machineId,serviceType,fee) values(cContractId,cMachineId,cServiceType,cFee);
    commit;
    EXCEPTION when OTHERS then 
        ROLLBACK;
        raise_application_error(-20001,'Machine already attatched to a Service Contract.');
end;

/


--New Repair Procedure
create or replace procedure new_repair(cPhoneNo varchar,cMachineId number,cServiceType varchar, cFee number ,cParts partsId) 
is
    programE EXCEPTION;
    PRAGMA exception_init( programE, -20001);
    serviceFee number := cFee;
    machineIsCovered number := isMachineCovered(cMachineId,cServiceType);
    insertedRepairJobId number;
    insertedRepairItemId number;
begin   
    set Transaction read write name 'NewRepairTransaction';
        checkCustomer(cPhoneNo);
        checkParts(cParts);
        checkMachine(cMachineId);
        if cServiceType not in('H','S') then raise_application_error(-20001,'Type of service should be H or S'); end if;
        if machineIsCovered > 0 then serviceFee := 0; end if;
        insert into Repair_Job (phoneNo,startDate) values (cPhoneNo,CURRENT_DATE) RETURNING repairJobId INTO insertedRepairJobId;
        insert into Repair_Item(repairJobId,machineId,serviceFee) values (insertedRepairJobId,cMachineId,serviceFee) return repairItemId into insertedRepairItemId;
        for i in 1..cParts.count loop
            insert into Repair_Parts (repairItemId,partId,price,quantity) select insertedRepairItemId,cParts(i),P.price,1 from Parts P where P.partId = cParts(i);
        end loop;
    commit work;
    exception when programE then 
        rollback;
    when others THEN rollback;
end;

/

-- Upsert Customer
create or replace procedure upsertCustomer(cPhoneNo varchar,cName varchar,cAddress varchar) 
is
begin
insert into Customer (address,name,phoneNo) values(cAddress,cName,cPhoneNo);
    commit;
    exception 
        when DUP_VAL_ON_INDEX THEN
            UPDATE Customer C
            SET C.name = cName,
                C.Address = cAddress
            WHERE C.phoneNo = cPhoneNo;
              commit;
end;

/
--Upsert Machine
create or replace procedure upsertMachine(cMachineId number,cParentMachineId number,cMake varchar,cModel varchar,cYear date,cType varchar,cSize number) 
is
begin
insert into Machine (machineId,PARENTMACHINEID,make,model,year,type,"size") values(cMachineId,cParentMachineId,cMake,cModel,cYear,cType,cSize);
    commit;
    exception 
        when DUP_VAL_ON_INDEX THEN
            UPDATE Machine M
            SET M.make = cMake,
                M.model = cModel,
                M.year = cYear,
                M.type = cType
            WHERE M.machineId = cMachineId;
            commit;
end;

/
--Upsert Part
create or replace procedure upsertPart(cPartId number,cPrice number,cDescription varchar) 
is
begin
insert into Parts (partId,price,description) values(cPartId,cPrice,cDescription);
    commit;
    exception 
        when DUP_VAL_ON_INDEX THEN
            UPDATE Parts P
            SET P.price = cPrice,
                P.description = cDescription
            WHERE P.partId = cPartId;
            commit;
end;

/

--Finish Repair
create or replace procedure finishRepair(repairId number) 
is
begin
update repair_job set endDate = CURRENT_DATE where repairJobId = repairId;
    commit;
    exception 
        when others THEN
            ROLLBACK;
end;

/
-- Check if All Parts exist
create or replace procedure checkParts(cParts partsId) is
partExist number;
begin
    for i in 1..cParts.count loop
    select count(*) into partExist from Parts P where P.partId = cParts(i);
        if partExist = 0 
            then raise_application_error(-20001,Concat('Part Not Found : partId = ',cParts(i)));
        end if;
    end loop;
end;

/

-- Check if Customer Exists
create or replace procedure checkCustomer(cPhoneNo VARCHAR) is
customerExist number;
begin
    select C.phoneNo into customerExist from Customer C where C.phoneNo = cPhoneNo;
    EXCEPTION when no_data_found then
        raise_application_error(-20001,Concat('Customer Not Found : phoneNo = ',cPhoneNo));
end;

/
-- Check if Machine Exists
create or replace procedure checkMachine(cMachineId number) is
machineExists number;
begin
    select M.machineId into machineExists from Machine M where M.machineId = cMachineId;
    EXCEPTION when no_data_found then
        raise_application_error(-20001,'Machine Not Found ');
end;


