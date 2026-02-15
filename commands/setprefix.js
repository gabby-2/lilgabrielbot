const fs = require('fs');
const isOwnerOrSudo = require('../lib/isOwner');

async function setprefixCommand(sock, chatId, message) {
  try {
    const senderId = message.key.participant || message.key.remoteJid;
    const isOwner = await isOwnerOrSudo(senderId, sock, chatId);
    if (!message.key.fromMe && !isOwner) {
      await sock.sendMessage(chatId, { text: 'Only bot owner can change the prefix.' }, { quoted: message });
      return;
    }

    const text = (
      message.message?.conversation ||
      message.message?.extendedTextMessage?.text ||
      ''
    ).trim();

    const parts = text.split(/\s+/);
    const newPrefix = parts[1];

    if (!newPrefix) {
      await sock.sendMessage(chatId, { text: 'Usage: setprefix <newPrefix>' }, { quoted: message });
      return;
    }

    // Update settings.js on disk so restart preserves it
    const settingsPath = './settings.js';
    try {
      let content = fs.readFileSync(settingsPath, 'utf8');
      if (/prefix\s*:\s*['\"]/.test(content)) {
        content = content.replace(/prefix\s*:\s*['\"][^'\"]*['\"]/, `prefix: '${newPrefix}'`);
      } else {
        content = content.replace(/const settings = \{\s*/i, `const settings = {\n  prefix: '${newPrefix}',\n`);
      }
      fs.writeFileSync(settingsPath, content, 'utf8');
    } catch (e) {
      console.error('Failed to update settings.js:', e);
      await sock.sendMessage(chatId, { text: 'Failed to update settings file. Check permissions.' }, { quoted: message });
      return;
    }

    // Update runtime prefix so change applies immediately
    global.PREFIX = newPrefix;

    await sock.sendMessage(chatId, { text: `Prefix updated to: ${newPrefix}\nYou can also set PREFIX in your .env file.` }, { quoted: message });
  } catch (err) {
    console.error('Error in setprefix command:', err);
    await sock.sendMessage(chatId, { text: 'An error occurred while setting prefix.' }, { quoted: message });
  }
}

module.exports = setprefixCommand;
