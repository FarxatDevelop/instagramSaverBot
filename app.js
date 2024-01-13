const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);
const { fetchData } = require("./action/fetchData");
module.exports = { bot };
require("./action/start");
const { Users } = require("./action/start");

// Set My Command
bot.telegram.setMyCommands([
  {
    command: "start",
    description: "Baslaw",
  },
  {
    command: "statistika",
    description: "Bot statistikasın biliw",
  },
]);
// Command
bot.command("statistika", (msg) => {
  msg.reply(`Jami paydalanıwshılar sani: ${Users.length}`);
});
// instagramSaverBot

// Events
bot.on(message("text"), (msg) => {
  const id = msg.from.id;
  const text = msg.update.message.text;
  if (
    text.includes("https://www.instagram.com/reel") ||
    text.includes("https://www.instagram.com/p")
  ) {
    fetchData(text, id, msg);
  } else {
    msg.reply("Keshiresiz, Instagram video yáki foto linkin 🔗 jiberiń");
  }
});

bot.launch();
