/*==============================================================*/
/* 20127056 VÕ DUY NHÂN                                         */
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127162	NGUYỄN SƠN HÒA                                      */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- Select the database
USE K20_GameFi_DATN_HCMUS;

-- Authenticate User
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS K20_GameFi_DATN_HCMUS.AuthenticateUser(
    IN userMail CHAR(30), 
    IN userPass TEXT
)
BEGIN
	DECLARE matchUserId CHAR(30); -- Declare the variable
    -- Hash the input password using SHA256
    SET userPass = SHA2(userPass, 256);

    -- Assign the value to the matchUserId variable
    SELECT ACC INTO matchUserId FROM K20_GameFi_DATN_HCMUS.USER WHERE MAIL = userMail AND PASS = userPass;

    IF matchUserId IS NOT NULL THEN
        -- Successful match, return the user's email
        SELECT matchUserId AS message;
    ELSE
        SELECT 'Email hoặc mật khẩu không đúng' AS message;
    END IF;
END //

DELIMITER ;


-- Get User Information
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS K20_GameFi_DATN_HCMUS.GetUser(
    IN ACC CHAR(30)
)
BEGIN
    SELECT MAIL, TEL, PASS, IGNAME, AVA, ACC FROM K20_GameFi_DATN_HCMUS.USER WHERE USER.ACC = ACC;
END //

DELIMITER ;


-- Add User
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS K20_GameFi_DATN_HCMUS.AddUser(
    IN userMail CHAR(50),
    IN userTel CHAR(15),
    IN userPass TEXT,
    IN userIGName CHAR(30),
    IN userAva CHAR(30),
    IN userAcc CHAR(30)
)
BEGIN
    -- Hash the input password using SHA256
    SET userPass = SHA2(userPass, 256);

    -- Check if userMail already exists in the USER table
    IF EXISTS (SELECT 1 FROM K20_GameFi_DATN_HCMUS.USER WHERE MAIL = userMail) THEN
        SELECT 'Email đã được sử dụng' AS message;
    ELSE
        -- Insert user information into the USER table
        INSERT INTO K20_GameFi_DATN_HCMUS.USER (MAIL, TEL, PASS, IGNAME, AVA, ACC)
        VALUES (userMail, userTel, userPass, userIGName, userAva, userAcc);
        SELECT 'Tạo tài khoản thành công' AS message;
    END IF;
END //

DELIMITER ;


-- Update User Information
DELIMITER //

CREATE PROCEDURE IF NOT EXISTS K20_GameFi_DATN_HCMUS.UpdateUser(
    IN userMail CHAR(50),
    IN userTel CHAR(15),
    IN userPass TEXT,
    IN userIGName CHAR(30),
    IN userAva CHAR(30),
    IN userAcc CHAR(30)
)
BEGIN
    UPDATE K20_GameFi_DATN_HCMUS.USER
    SET 
        TEL = userTel,
        PASS = SHA2(userPass, 256),
        IGNAME = userIGName,
        AVA = userAva,
        ACC = userAcc
    WHERE MAIL = userMail;
    SELECT 'Cập nhật thông tin thành công' AS message;
END //

DELIMITER ;



