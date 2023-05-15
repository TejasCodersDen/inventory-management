--Returns a summary of Repairs
CREATE OR REPLACE VIEW PARTSSUMMARY AS
    SELECT
        C.PHONENO,
        C.NAME,
        NULL       AS CONCTRACTID,
        RJ.REPAIRJOBID,
        RJ.STARTDATE AS PROCESSED_AT,
        M.MACHINEID,
        M.MAKE,
        M.MODEL,
        RI.SERVICEFEE,
        P.PARTID,
        P.DESCRIPTION,
        RP.PRICE
    FROM
        CUSTOMER     C
        LEFT OUTER JOIN REPAIR_JOB RJ
        ON C.PHONENO = RJ.PHONENO
        LEFT OUTER JOIN REPAIR_ITEM RI
        ON RJ.REPAIRJOBID = RI.REPAIRJOBID
        INNER JOIN MACHINE M
        ON RI.MACHINEID = M.MACHINEID
        LEFT OUTER JOIN REPAIR_PARTS RP
        ON RI.REPAIRITEMID = RP.REPAIRITEMID
        LEFT OUTER JOIN PARTS P
        ON P.PARTID = RP.PARTID

/

--Returns a summary of Contract Fees
CREATE OR REPLACE VIEW CONTRACTSUMMARY AS
    SELECT
        C.PHONENO,
        C.NAME,
        SC.CONTRACTID,
        NULL           AS REPAIRJOB,
        STARTDATE   AS PROCESSED_AT,
        M.MACHINEID,
        M.MAKE,
        M.MODEL,
        SI.FEE         AS SERVICEFEE,
        NULL           AS PARTID,
        'CONTRACT FEE' AS DESCRIPTION,
        SI.FEE * MONTHS_BETWEEN ( ENDDATE,
        TRUNC (STARTDATE,
        'MONTH'))             AS PRICE
    FROM
        CUSTOMER         C
        INNER JOIN SERVICE_CONTRACT SC
        ON C.PHONENO = SC.PHONENO
        INNER JOIN SERVICE_ITEM SI
        ON SC.CONTRACTID = SI.CONTRACTID
        INNER JOIN MACHINE M
        ON SI.MACHINEID = M.MACHINEID

/

--Returns a summary of Repairs and Contract Fees
CREATE OR REPLACE VIEW COMPLETESUMMARY AS
    SELECT
        *
    FROM
        (
            SELECT
                *
            FROM
                CONTRACTSUMMARY UNION
                SELECT
                    *
                FROM
                    PARTSSUMMARY
        )
    ORDER BY
        PROCESSED_AT;

/

create or replace view V_CUSTOMER AS
    select C.*,SC.CNT as Contracts,RJ.CNT as Repairs from customer C 
    left join (select count(*) as cnt,phoneNo from service_contract where active = 1 group by phoneNo) SC on SC.PhoneNo = C.phoneNo
    left join (select count(*) as cnt,phoneNo from repair_job where endDate is null group by phoneNo) RJ on RJ.PhoneNo = C.phoneNo;

