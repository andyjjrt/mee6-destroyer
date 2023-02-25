const { Client } = require("discord.js-selfbot-v13");
const chalk = require("chalk");
require("dotenv").config();
const messages = require("./messages.js");

const channelId = process.env.CHANNEL_ID;
const token = process.env.DISCORD_TOKEN;

const client = new Client({
  checkUpdate: false,
});

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
  await sendMessage();
  setInterval(() => sendMessage(), 61000);
});

client.on("messageCreate", async (message) => {
  const id = client.user.id;
  if (message.channelId === channelId && message.author.id !== id) {
    message
      .react("👎")
      .then((reaction) =>
        console.log(
          `${chalk.blue("[Reaction]")} Reacted message ${
            reaction.message
          } at ${new Date().toLocaleString()}`
        )
      )
      .catch(console.error);
  }
});

const sendMessage = async () => {
  return client.channels
    .fetch(channelId)
    .then((channel) =>
      channel
        .send(messages[Math.floor(Math.random() * messages.length)])
        .then(() =>
          console.log(
            `${chalk.green(
              "[Message]"
            )} Sent message at ${new Date().toLocaleString()}`
          )
        )
    )
    .catch(console.error);
};

client.login(token);
