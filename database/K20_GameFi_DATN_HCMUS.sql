/*==============================================================*/
/* 20127056 VÕ DUY NHÂN                                         */
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127162	NGUYỄN SƠN HÒA                                      */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- Create schema
DROP SCHEMA IF EXISTS K20_GameFi_DATN_HCMUS;
CREATE SCHEMA K20_GameFi_DATN_HCMUS;

-- Set search path to the TAXI schema
SET search_path = K20_GameFi_DATN_HCMUS;

-- Create ACCOUNT table
CREATE TABLE ACCOUNT
(
   MAIL                 CHAR(50) NOT NULL,
   TEL                  CHAR(15) NOT NULL,
   PASS                 TEXT NOT NULL,
   IGNAME               CHAR(30) NOT NULL,
   AVA                  CHAR(30) NOT NULL,
   ACC                  CHAR(30) NOT NULL,
   PRIMARY KEY (MAIL)
);






