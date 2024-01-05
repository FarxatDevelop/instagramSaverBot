const axios = require("axios");
const { bot } = require("../app");

async function fetchData(text, id, msg) {
  const options = {
    method: "GET",
    url: "https://instagram-post-reels-stories-downloader1.p.rapidapi.com/",
    params: {
      url: text,
    },
    headers: {
      "X-RapidAPI-Key": "9151276723mshd1391a8b92940ccp199696jsn45b2359dee46",
      "X-RapidAPI-Host":
        "instagram-post-reels-stories-downloader1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data != null) {
      const type = response.data.result[0].type;
      const url = response.data.result[0].url;
      if (type == "video") {
        msg.telegram.sendVideo(id, url);
      } else if (type == "photo") {
        msg.telegram.sendPhoto(id, url);
      }
    } else {
      msg.reply("Link qate");
    }
  } catch (error) {
    console.error("error");
  }
}

module.exports = { fetchData };
