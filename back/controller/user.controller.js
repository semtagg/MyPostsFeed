const db = require('../db/db')
const jwt = require("jsonwebtoken")
require('dotenv').config()

class UserController {
  async login(data) {
    return new Promise(async (resolve, reject) => {
      const nicknames = await db.query("SELECT nickname FROM person");

      if (nicknames.rows.find(el => el.nickname === data.nickname) != undefined) {
        let userId = await db.query("SELECT id FROM person WHERE nickname = $1", [data.nickname]);

        const token = jwt.sign(
          {user_id: userId},
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        resolve({token: token})
      } else {
        reject("User is not exist")
      }
    });
  }

  async register(data) {
    return new Promise(async (resolve, reject) => {
      const nicknames = await db.query("SELECT nickname FROM person");

      if (nicknames.rows.find(el => el.nickname === data.nickname) != undefined) {
        reject("User is already exist")
      } else {
        await db.query("INSERT INTO person(nickname) VALUES($1)", [data.nickname])
        let userId = await db.query("SELECT id FROM person WHERE nickname = $1", [data.nickname]);

        const token = jwt.sign(
          {user_id: userId},
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        resolve({token: token})
      }
    });
  }

  async getAllNicknames() {
    return new Promise(async (resolve, reject) => {
      try {
        const nicks = await db.query("SELECT nickname FROM person");
        resolve(nicks.rows)
      } catch (e) {
        reject("No id")
      }
    });
  }
}

module.exports = UserController;
