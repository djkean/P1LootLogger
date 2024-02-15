//used in /createaccount
module.exports = { checkUserEmail: `
  SELECT 
    CASE
      WHEN EXISTS (SELECT 1 FROM \`usertable4\` WHERE \`username\` = ?) THEN 'username is taken' 
      WHEN EXISTS (SELECT 1 FROM \`usertable4\` WHERE \`email\` = ?) THEN 'email is already used' 
      ELSE 'username and email are available' 
    END AS result`
}

//used in /createaccount
module.exports = { createAccount:  `
  INSERT INTO \`usertable4\` 
  (
    \`username\`, \`email\`, \`password\`, 
    \`salt\`, \`createdAt\`, \`token\`, 
    \`status\`
  ) 
  VALUES (?, ?, ?, ?, ?, ?, 5)`
}

//used in /login
module.exports = { logUserIn: `
SELECT \`userID\`, \`email\`, \`password\`, \`salt\`, \`status\` 
FROM \`usertable4\` WHERE \`email\` = ? 
LIMIT 1`
}

//used in /forgotpassword
module.exports = { confirmEmail: `
  SELECT \`email\` 
  FROM \`usertable4\` 
  WHERE \`email\` = ? 
  LIMIT 1`
}

//used in /deleteaccount and /changepassword
module.exports =  { confirmPassword:`
  SELECT \`email\`, \`password\`, \`salt\` 
  FROM \`usertable4\` 
  WHERE \`email\` = ?
  LIMIT 1`
}

//used in /deleteaccount
module.exports = { deleteAccount: `
  DELETE FROM \`usertable4\` 
  WHERE \`email\` = ? 
  LIMIT 1`
}

//used in /changepassword
module.exports = { changePassword: `
  UPDATE \`usertable4\` 
  SET \`password\` = ?, \`salt\` = ? 
  WHERE \`email\` = ? 
  LIMIT 1`
}

//used in /changeusername
module.exports = { isUsernameUnique: `
  SELECT \`username\` 
  FROM \`usertable4\` 
  WHERE \`username\` = ?` 
}

//used in /changeusername
module.exports = { changeUsername: `
  UPDATE \`usertable4\` 
  SET \`username\` = ? 
  WHERE \`email\` = ? 
  LIMIT 1`
}

//used in /createnewpassword
module.exports = { authenticateUser:  `
  SELECT \`email\`, \`requestedAt\`, \`requestToken\` 
  FROM \`usertable4\` 
  WHERE \`email\` = ? 
  LIMIT 1`
}

//used in /createnewpassword
module.exports = { newPassword: ` 
  UPDATE \`usertable4\` 
  SET \`password\` = ?, \`salt\` = ?, \`requestedAt\` = ?, \`requestToken\` = ? 
  WHERE \`email\` = ? 
  LIMIT 1`
}

//used in /submitloot
module.exports = { submitLoot: `
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
}


