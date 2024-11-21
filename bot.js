const { exec } = require("child_process");
const { Telegraf } = require("telegraf"); // Telegram Bot API library
require("dotenv").config();

// Create the bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command
bot.start((ctx) => {
  ctx.reply("System will shut down now...");
  // Execute shutdown command 11
  const platform = process.platform;
  if (platform === "win32") {
    exec("shutdown /s /t 1", (error) => {
      if (error) {
        console.error(`Error shutting down: ${error}`);
        ctx.reply("Error occurred during shutdown.");
      }
    });
  } else if (platform === "linux" || platform === "darwin") {
    exec("sudo shutdown now", (error) => {
      if (error) {
        console.error(`Error shutting down: ${error}`);
        ctx.reply("Error occurred during shutdown.");
      }
    });
  } else {
    ctx.reply("Shutdown not supported on this platform.");
  }
});

// Launch the bot
bot.launch();
console.log("Bot is running...");
