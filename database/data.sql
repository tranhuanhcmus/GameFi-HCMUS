/*==============================================================*/
/* 20127056 VÕ DUY NHÂN                                         */
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127162	NGUYỄN SƠN HÒA                                      */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- Insert data into USER table
INSERT INTO K20_GameFi_DATN_HCMUS.USER (MAIL, TEL, PASS, IGNAME, AVA, ACC)
VALUES
    ('20127056@gmail.com', '20127056', SHA2('Random_Password_1', 256), 'Vo Duy Nhan', 'D1.png', '6589320147'),
    ('20127063@gmail.com', '20127063', SHA2('Random_Password_2', 256), 'Phan Minh Phuc', 'D2.png', '3150782496'),
    ('20127162@gmail.com', '20127162', SHA2('Random_Password_3', 256), 'Nguyen Son Hoa', 'D3.png', '8912634075'),
    ('20127237@gmail.com', '20127237', SHA2('Random_Password_4', 256), 'Bui Tran Huan', 'D4.png', '4062819357'),
    ('20127507@gmail.com', '20127507', SHA2('Random_Password_5', 256), 'Nguyen Tan Luc', 'D5.png', '5291760348');

