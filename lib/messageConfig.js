const channelInfo = {
    contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363424591918412@newsletter',
            newsletterName: 'Lil Gabriel Bot',
            serverMessageId: -1
        }
    }
};

function formatMessage(text, emoji = '❗') {
    if (!text) return ` ${emoji} \n\nLil Gabriel Bot`;
    return `${emoji} ${text}\n\nLil Gabriel Bot`;
}

module.exports = {
    channelInfo: channelInfo,
    formatMessage
};
