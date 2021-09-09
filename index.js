// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

function calcTime(offset, plus_hours = 0) {
  // create Date object for current location
  d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  utc = d.getTime() + d.getTimezoneOffset() * 60000;

  console.log(d.getTimezoneOffset());

  let add_hours = plus_hours * 3600000;

  // create new Date object for different city
  // using supplied offset
  nd = new Date(utc + (3600000 * offset) + add_hours);

  // return time as a string
  return nd.toLocaleString();
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "time") {
    await interaction.reply(
      "Gage: " + calcTime("-5") + "\nLeslie: " + calcTime("+12")
    );
  } else if (commandName === "whattime") {
    const add = interaction.options.getInteger("hours");
    await interaction.reply(
      "Gage: " + calcTime("-5", add) + "\nLeslie: " + calcTime("+12", add)
    );
  }
});

// Login to Discord with your client's token
client.login(token);
