const { exec } = require("child_process");
const { Telegraf } = require("telegraf"); // Telegram Bot API library
require("dotenv").config();

// Create the bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command
bot.start((ctx) => {
  ctx.reply("Send /shutdown to shut down your PC.");
});

// Shutdown command
bot.command("shutdown", (ctx) => {
  ctx.reply("Shutting down the system...");
  // Execute shutdown command
  const platform = process.platform;
  if (platform === "win32") {
    exec("shutdown /s /t 1", (error) => {
      if (error) {
        console.error(`Error shutting down: ${error}`);
      }
    });
  } else if (platform === "linux" || platform === "darwin") {
    exec("sudo shutdown now", (error) => {
      if (error) {
        console.error(`Error shutting down: ${error}`);
      }
    });
  } else {
    ctx.reply("Shutdown command not supported on this platform.");
  }
});

// Launch the bot
bot.launch();

console.log("Bot is running...");
