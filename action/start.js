const { bot } = require("../app");
const fs = require("fs");
const path = "./users/users.json";
const adminId = 1358716538;

const Users = JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
module.exports = { Users };

let checkUser = true;

bot.start((msg) => {
  const id = msg.from.id;
  const name = msg.from.first_name;
  const username = msg.from.username;
  Users.find((user) =>
    user.id == id ? (checkUser = true) : (checkUser = false)
  );
  !checkUser
    ? addUser(id, name, username)
    : msg.reply(
        `<b>${name}</b>, siz botta burınnan barsız
instagram video yáki foto linkin 🔗 jiberiń`,
        { parse_mode: "HTML" }
      );
  checkUser = true;
});

function addUser(id, name, username) {
  bot.telegram.sendMessage(
    id,
    `👋Assalawma aleykum <b>${name}</b>. Botqa xosh kelipsiz.
Botdan tolıq paydalanıw ushın maǵan
instagram video yáki foto linkin 🔗 jiberiń`,
    { parse_mode: "HTML" }
  );
  Users.push({ id, name });
  fs.writeFileSync(path, JSON.stringify(Users), {
    encoding: "utf8",
    flag: "w",
  });
  alarmNewUser(name, username);
}

function alarmNewUser(name, username) {
  bot.telegram.sendMessage(
    adminId,
    `😇Jańa paydalanıwshı qosıldı

Ati: ${name}
User: ${username ? "@" + username : "Joq"}
Jami paydalanıwshılar sani: ${Users.length}`
  );
}
