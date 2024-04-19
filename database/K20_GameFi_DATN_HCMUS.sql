/*==============================================================*/
/* 20127056 VÕ DUY NHÂN                                         */
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127162	NGUYỄN SƠN HÒA                                      */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- Create schema
--DROP SCHEMA IF EXISTS K20_GameFi_DATN_HCMUS;
--CREATE SCHEMA K20_GameFi_DATN_HCMUS;

-- Set search path to the K20_GameFi_DATN_HCMUS schema
--SET search_path = K20_GameFi_DATN_HCMUS;


-- Create NFT table
--DROP TABLE NFT;
--CREATE TABLE NFT
--(
--	TOKENID TEXT NOT NULL,
--	TOKENURI TEXT NOT NULL,
--	OWNER TEXT NOT NULL,
--	PRIMARY KEY (TOKENID)
--);

-- Create TOKENURI table
--DROP TABLE TOKENURI;
CREATE TABLE TOKENURI
(
	TOKENURI TEXT NOT NULL,
	DATA JSONB,
	PRIMARY KEY (TOKENURI)
);

-- Thêm khóa ngoại vào bảng NFT để tham chiếu đến trường TOKENURI trong bảng TOKENURI
--ALTER TABLE NFT
--ADD CONSTRAINT FK_NFT_TOKENURI
--FOREIGN KEY (TOKENURI)
--REFERENCES TOKENURI(TOKENURI);

