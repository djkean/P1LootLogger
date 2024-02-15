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
      \`boss_id\`, 
      \`user_id\`, 
      \`trainerlevel\`, 
      \`submitted\`, 
      \`buff\`, 
      \`loot1\`, 
      \`loot2\`,
      \`loot3\`, 
      \`loot4\`, 
      \`loot5\`, 
      \`money\`, 
      \`boxes\`, 
      \`gold\`, 
      \`special\`, 
      \`difficulty\`
    ) 
  VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
}

//used in /bossname
module.exports = { bossName: `
  SELECT \`bossName\`, \`ID\` 
  FROM \`bosstable\` 
  WHERE \`ID\` = ? LIMIT 1`
}
//used in /bossdata
module.exports = { allLootData: `
  SELECT 
    loot.report_id, 
    loot.user_id, 
    loot.trainerlevel, 
    loot.submitted, 
    loot.buff, 
    loot.money, 
    loot.boxes,
    loot.gold, 
    loot.loot1 AS loot1, 
    i1.name AS loot1name, 
    i1.image AS loot1image, 
    loot.loot2 AS loot2, 
    i2.name AS loot2name, 
    i2.image AS loot2image, 
    loot.loot3 AS loot3, 
    i3.name AS loot3name, 
    i3.image AS loot3image, 
    loot.loot4 AS loot4, 
    i4.name AS loot4name, 
    i4.image AS loot4image, 
    loot.loot5 AS loot5, 
    i5.name AS loot5name, 
    i5.image AS loot5image,
    bosstable.bossName 
  FROM 
    lootreports 
      AS loot 
    LEFT JOIN 
      newitemtable AS i1 ON loot.loot1 = i1.id 
    LEFT JOIN 
      newitemtable AS i2 ON loot.loot2 = i2.id 
    LEFT JOIN 
      newitemtable AS i3 ON loot.loot3 = i3.id
    LEFT JOIN 
      newitemtable AS i4 ON loot.loot4 = i4.id
    LEFT JOIN 
      newitemtable AS 15 ON loot.loot5 - i5.id
    LEFT JOIN 
      bosstable ON loot.boss_id = bosstable.ID
    WHERE
      loot.boss_id = ?
    AND EXISTS
      (
        SELECT 
          1 
        FROM 
          bosstable 
        WHERE 
          bosstable.ID = loot.boss_id
      )`
}