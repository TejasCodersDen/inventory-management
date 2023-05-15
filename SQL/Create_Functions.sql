create or replace type partsId  is table of number;

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


create or replace function isMachineCovered(cMachineid number,cServiceType varchar) return number is
machineIsCovered number;
parentMachineIsCovered number;
begin
    select count(*) into machineIsCovered from Service_Item SI 
                        inner join Service_Contract SC on SC.contractId = SI.contractId 
                        where SI.machineId = cMachineId and SC.active = 1
                        and SI.serviceType = cServiceType and ROWNUM = 1;
     select count(*) into parentMachineIsCovered from Service_Item SI 
                        inner join Service_Contract SC on SC.contractId = SI.contractId
                        inner join Machine M on M.machineId = cMachineId
                        inner join Machine PM on M.ParentMachineId   = PM.MACHINEID
                        where SC.active = 1 and SI.serviceType = cServiceType and ROWNUM = 1;

    return machineIsCovered + parentMachineIsCovered;            
end;
