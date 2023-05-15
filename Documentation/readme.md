## Tables:

# Procedures
## new_contract
This procedure creates a new contract for a user and a machine.


inputs: phoneNo varchar(11); contractId number; startDate date; endDate date; machineId number; fee number; serviceType char.

Ex:

This code creates a new contract for a customer with the phoneNo = '16507326291', the contract Id will be 919, this contract starts in january 10th 2023, this contract ends in january 10th 2024, this contract will be covering the machine with id 1, the fee for this contract will be 10, the contract will covers Hardware.

    call new_contract('6507326291',919,'10-jan-2023','10-jan-2024',1,10,'H');
  
### new_repair

This procedure will create a new repair service, if the customer requesting the service is not yet registered then this customer will be automatically register.
If the customer is already register its data will be updated (upsertcustomer).

inputs: phoneNo varchar(11), name varchar(30), address varchar(100), machineId number, serviceType char, fee number, parts partsId,success number out,message varchar(100) out.

Ex:

The following code will create a repairJob for the customer ('16507326291','Giulliano Silva Siviero','30 Angel Ct') for the machine with id 1, this service will use the parts with ids (1,2,3).
    
    declare
      parts partsId := partsId(1,2,3);
      outcode int := 0;
      message varchar(100);
    begin
      new_repair('16507326291','Giulliano Siviero', '30 Angel Ct, Stanford',100,'H',15,parts,outcode,message);
      dbms_output.put_line(message);
    end;
    
## upsertcustomer
  This procedure inserts a new customer if the provided phoneNo is not yet registered in the User Table Yet. 
  If there is already a tuple with that phone number than it will update this user's atribute values.
  
  inputs: phoneNo varchar(11); name varchar(30); address varchar(100)

  Ex:
  
  This code will update or insert a user with phoneno = '16507326291', name = 'Giulliano Silva Siviero' and address = '30 Angel Ct'
  
  ```
    call upsertcustomer('16507326291','Giulliano Silva Siviero','30 Angel Ct');
  ```
## upsertmachine
  
## checkmachine
  This procedure checks if a certain machine exists, if it does not exit throws an exception
  inputs: machineId number.
  
  Ex: 
  This code will check if a machine with id = 1. If not it will throw an exception
  ```
    call checkmachine(1);
  ```
## checkparts
This procedure checks if list of parts exists, if it does not exit throws an exception
  inputs: partsId [number].
  
  Ex: 
  This code will check if parts with ids 1,2, and 3 exists. If not it will throw an exception
  ```
    declare
    parts partsId := partsId(1,2,3)
    begin
      checkparts(parts);
    end;
  ```
## checkcustomer
   This procedure checks if a certain user exists, if it does not exit throws an exception
  inputs: phoneNo number.
  
  Ex: 
  This code will check if a user with phoneNo = '16507326291'. If not it will throw an exception
  
    call checkuser('16507326291');

# Functions
  ### machinecovered
   Returns 1 if machine is covered by an active service contract. 
   Returns 0 if machine is not covered by an active service contract.
   
   inputs: machineId number ;  serviceType char
   
   Ex:
   
   This code will check if machine with id 1 is covered by an active service contract for Hardware.
    
      select ismachinecovered(1,'H') from dual;
    
# Views
