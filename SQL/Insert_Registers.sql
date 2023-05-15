call upsertCustomer('16507326291','Giulliano Siviero','30 Angel Ct');
call upsertCustomer('16692959614','Tejas Potti','500 Camino Real');


call upsertMachine(1,null,'Apple','MacMini','01-jan-2023','D',0);
call upsertMachine(2,null,'Apple','Macbook Pro','01-jan-2023','N',0);
call upsertMachine(3,null,'Dell','XPS 13','01-jan-2023','N',0);
call upsertMachine(4,null,'Lenovo','Think Station','01-jan-2023','D',0);
call upsertMachine(5,4,'Lenovo','Think Vision','01-jan-2023','M',23);

call upsertPart(1,120,'RAM 16Gb DDR3');
call upsertPart(2,100,'SSD 256Gb');
call upsertPart(3,30,'Cooler Noctua');
call upsertPart(4,295,'Photoshop');
call upsertPart(5,300,'Davinci Resolve');

/

-- call new_contract('16507326291',1,'01-jan-2023','01-jan-2024',1,15,'H');

-- call new_repair('16507326291',1,'H',10,partsId(2));
-- call new_repair('16507326291',1,'S',10,partsId(4,5));
-- call FINISHREPAIR(1);