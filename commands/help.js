const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const prefix = global.PREFIX || process.env.PREFIX || '.';
    const helpMessage = `
╔═══════════════════╗
   *🤖 ${settings.botName || 'Lil Gabriel Bot'}*  
   Version: *${settings.version || '1.0.0'}*
   by ${settings.botOwner || 'Lil Gabriel'}
   YT : ${global.ytch}
╚═══════════════════╝

*Lil Gabriel Bot Commands:*

╔═══════════════════╗
🌐 *General Commands*:
║ ➤ ${prefix}help or ${prefix}menu
║ ➤ ${prefix}ping
║ ➤ ${prefix}alive
║ ➤ ${prefix}tts <text>
║ ➤ ${prefix}owner
║ ➤ ${prefix}joke
║ ➤ ${prefix}quote
║ ➤ ${prefix}fact
║ ➤ ${prefix}weather <city>
║ ➤ ${prefix}news
║ ➤ ${prefix}attp <text>
║ ➤ ${prefix}lyrics <song_title>
║ ➤ ${prefix}8ball <question>
║ ➤ ${prefix}groupinfo
║ ➤ ${prefix}staff or ${prefix}admins 
║ ➤ ${prefix}vv
║ ➤ ${prefix}trt <text> <lang>
║ ➤ ${prefix}ss <link>
║ ➤ ${prefix}jid
║ ➤ ${prefix}url
╚═══════════════════╝ 

╔═══════════════════╗
👮‍♂️ *Admin Commands*:
║ ➤ ${prefix}ban @user
║ ➤ ${prefix}promote @user
║ ➤ ${prefix}demote @user
║ ➤ ${prefix}mute <minutes>
║ ➤ ${prefix}unmute
║ ➤ ${prefix}delete or ${prefix}del
║ ➤ ${prefix}kick @user
║ ➤ ${prefix}warnings @user
║ ➤ ${prefix}warn @user
║ ➤ ${prefix}antilink
║ ➤ ${prefix}antibadword
║ ➤ ${prefix}clear
║ ➤ ${prefix}tag <message>
║ ➤ ${prefix}tagall
║ ➤ ${prefix}tagnotadmin
║ ➤ ${prefix}hidetag <message>
║ ➤ ${prefix}chatbot
║ ➤ ${prefix}resetlink
║ ➤ ${prefix}antitag <on/off>
║ ➤ ${prefix}welcome <on/off>
║ ➤ ${prefix}goodbye <on/off>
║ ➤ ${prefix}setgdesc <description>
║ ➤ ${prefix}setgname <new name>
║ ➤ ${prefix}setgpp (reply to image)
╚═══════════════════╝

╔═══════════════════╗
🔒 *Owner Commands*:
║ ➤ ${prefix}mode <public/private>
║ ➤ ${prefix}clearsession
║ ➤ ${prefix}antidelete
║ ➤ ${prefix}cleartmp
║ ➤ ${prefix}update
║ ➤ ${prefix}settings
║ ➤ ${prefix}setpp <reply to image>
║ ➤ ${prefix}autoreact <on/off>
║ ➤ ${prefix}autostatus <on/off>
║ ➤ ${prefix}autostatus react <on/off>
║ ➤ ${prefix}autotyping <on/off>
║ ➤ ${prefix}autoread <on/off>
║ ➤ ${prefix}anticall <on/off>
║ ➤ ${prefix}pmblocker <on/off/status>
║ ➤ ${prefix}pmblocker setmsg <text>
║ ➤ ${prefix}setmention <reply to msg>
║ ➤ ${prefix}mention <on/off>
╚═══════════════════╝

╔═══════════════════╗
🎨 *Image/Sticker Commands*:
║ ➤ ${prefix}blur <image>
║ ➤ ${prefix}simage <reply to sticker>
║ ➤ ${prefix}sticker <reply to image>
║ ➤ ${prefix}removebg
║ ➤ ${prefix}remini
║ ➤ ${prefix}crop <reply to image>
║ ➤ ${prefix}tgsticker <Link>
║ ➤ ${prefix}meme
║ ➤ ${prefix}take <packname> 
║ ➤ ${prefix}emojimix <emj1>+<emj2>
║ ➤ ${prefix}igs <insta link>
║ ➤ ${prefix}igsc <insta link>
╚═══════════════════╝  

╔═══════════════════╗
🖼️ *Pies Commands*:
║ ➤ ${prefix}pies <country>
║ ➤ ${prefix}china 
║ ➤ ${prefix}indonesia 
║ ➤ ${prefix}japan 
║ ➤ ${prefix}korea 
║ ➤ ${prefix}hijab
╚═══════════════════╝

╔═══════════════════╗
🎮 *Game Commands*:
║ ➤ ${prefix}tictactoe @user
║ ➤ ${prefix}hangman
║ ➤ ${prefix}guess <letter>
║ ➤ ${prefix}trivia
║ ➤ ${prefix}answer <answer>
║ ➤ ${prefix}truth
║ ➤ ${prefix}dare
╚═══════════════════╝

╔═══════════════════╗
🤖 *AI Commands*:
║ ➤ ${prefix}gpt <question>
║ ➤ ${prefix}gemini <question>
║ ➤ ${prefix}imagine <prompt>
║ ➤ ${prefix}flux <prompt>
║ ➤ ${prefix}sora <prompt>
╚═══════════════════╝

╔═══════════════════╗
🎯 *Fun Commands*:
║ ➤ ${prefix}compliment @user
║ ➤ ${prefix}insult @user
║ ➤ ${prefix}flirt 
║ ➤ ${prefix}shayari
║ ➤ ${prefix}goodnight
║ ➤ ${prefix}roseday
║ ➤ ${prefix}character @user
║ ➤ ${prefix}wasted @user
║ ➤ ${prefix}ship @user
║ ➤ ${prefix}simp @user
║ ➤ ${prefix}stupid @user [text]
╚═══════════════════╝

╔═══════════════════╗
🔤 *Textmaker*:
║ ➤ ${prefix}metallic <text>
║ ➤ ${prefix}ice <text>
║ ➤ ${prefix}snow <text>
║ ➤ ${prefix}impressive <text>
║ ➤ ${prefix}matrix <text>
║ ➤ ${prefix}light <text>
║ ➤ ${prefix}neon <text>
║ ➤ ${prefix}devil <text>
║ ➤ ${prefix}purple <text>
║ ➤ ${prefix}thunder <text>
║ ➤ ${prefix}leaves <text>
║ ➤ ${prefix}1917 <text>
║ ➤ ${prefix}arena <text>
║ ➤ ${prefix}hacker <text>
║ ➤ ${prefix}sand <text>
║ ➤ ${prefix}blackpink <text>
║ ➤ ${prefix}glitch <text>
║ ➤ ${prefix}fire <text>
╚═══════════════════╝

╔═══════════════════╗
📥 *Downloader*:
║ ➤ ${prefix}play <song_name>
║ ➤ ${prefix}song <song_name>
║ ➤ ${prefix}spotify <query>
║ ➤ ${prefix}instagram <link>
║ ➤ ${prefix}facebook <link>
║ ➤ ${prefix}tiktok <link>
║ ➤ ${prefix}video <song name>
║ ➤ ${prefix}ytmp4 <Link>
╚═══════════════════╝

╔═══════════════════╗
🧩 *MISC*:
║ ➤ ${prefix}heart
║ ➤ ${prefix}horny
║ ➤ ${prefix}circle
║ ➤ ${prefix}lolice
║ ➤ ${prefix}its-so-stupid
║ ➤ ${prefix}namecard 
║ ➤ ${prefix}oogway
║ ➤ ${prefix}tweet
║ ➤ ${prefix}ytcomment 
║ ➤ ${prefix}comrade 
║ ➤ ${prefix}gay 
║ ➤ ${prefix}glass 
║ ➤ ${prefix}jail 
║ ➤ ${prefix}passed 
║ ➤ ${prefix}triggered
╚═══════════════════╝

╔═══════════════════╗
🖼️ *ANIME*:
║ ➤ ${prefix}nom 
║ ➤ ${prefix}poke 
║ ➤ ${prefix}cry 
║ ➤ ${prefix}kiss 
║ ➤ ${prefix}pat 
║ ➤ ${prefix}hug 
║ ➤ ${prefix}wink 
║ ➤ ${prefix}facepalm 
╚═══════════════════╝

╔═══════════════════╗
💻 *Github Commands:*
║ ➤ ${prefix}git
║ ➤ ${prefix}github
║ ➤ ${prefix}sc
║ ➤ ${prefix}script
║ ➤ ${prefix}repo
╚═══════════════════╝
 Powered by *${settings.botName || 'Lil Gabriel'}* |
Join our channel for updates:`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363424591918412@newsletter',
                        newsletterName: 'Lil Gabriel Bot',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363424591918412@newsletter',
                        newsletterName: 'Lil Gabriel Bot by Lil Gabriel',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;