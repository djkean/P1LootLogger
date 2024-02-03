//used in /createaccount
export const checkUserEmailQuery = `
SELECT 
  CASE
    WHEN EXISTS (SELECT 1 FROM \`usertable4\` WHERE \`username\` = ?) THEN 'username is taken' 
    WHEN EXISTS (SELECT 1 FROM \`usertable4\` WHERE \`email\` = ?) THEN 'email is already used' 
    ELSE 'username and email are available' 
  END AS result`

//used in /createaccount
export const createAccountQuery = `
INSERT INTO \`usertable4\` 
(
  \`username\`, \`email\`, \`password\`, 
  \`salt\`, \`createdAt\`, \`token\`, 
  \`status\`
) 
VALUES (?, ?, ?, ?, ?, ?, 5)`

//used in /login
export const loginQuery = `
SELECT \`userID\`, \`email\`, \`password\`, \`salt\`, \`status\` 
FROM \`usertable4\` WHERE \`email\` = ? 
LIMIT 1`

//used in /forgotpassword
export const confirmEmailQuery = `
SELECT \`email\` 
FROM \`usertable4\` 
WHERE \`email\` = ? 
LIMIT 1`

//used in /deleteaccount and /changepassword
export const confirmPasswordQuery = `
SELECT \`email\`, \`password\`, \`salt\` 
FROM \`usertable4\` 
WHERE \`email\` = ?
LIMIT 1`

//used in /deleteaccount
export const deleteAccountQuery = `
DELETE FROM \`usertable4\` 
WHERE \`email\` = ? 
LIMIT 1`

//used in /changepassword
export const changePasswordQuery = `
UPDATE \`usertable4\` 
SET \`password\` = ?, \`salt\` = ? 
WHERE \`email\` = ? 
LIMIT 1`

//used in /changeusername
export const isUsernameUnique = `
SELECT \`username\` 
FROM \`usertable4\` 
WHERE \`username\` = ?`

//used in /changeusername
export const changeUsernameQuery = `
UPDATE \`usertable4\` 
SET \`username\` = ? 
WHERE \`email\` = ? 
LIMIT 1`

//used in /createnewpassword
export const authenticateUserQuery = `
SELECT \`email\`, \`requestedAt\`, \`requestToken\` 
FROM \`usertable4\` 
WHERE \`email\` = ? 
LIMIT 1`

//used in /createnewpassword
export const newPasswordQuery = `
UPDATE \`usertable4\` 
SET \`password\` = ?, \`salt\` = ?, \`requestedAt\` = ?, \`requestToken\` = ? 
WHERE \`email\` = ? 
LIMIT 1`

//used in /submitloot
export const submitLootQuery = `
INSERT INTO \`lootreports\` 
(
  \`boss_id\`, \`user_id\`, \`trainerlevel\`, 
  \`submitted\`, \`buff\`, \`loot1\`, 
  \`loot2\`, \`loot3\`, \`loot4\`, 
  \`loot5\`, \`money\`, \`boxes\`, 
  \`gold\`, \`special\`, \`difficulty\`
) 
VALUES 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
