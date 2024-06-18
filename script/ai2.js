const axios = require('axios');

module.exports.config = {
  name: 'ai2',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {

  const input = args.join(' ');


  
  if (!input) {
    api.sendMessage(`HELLO IM GPT4o, What can i help you?`, event.threadID, event.messageID);
    return;
  }
  api.setMessageReaction("⏳", event.messageID, (err) => {
  }, true);
api.sendTypingIndicator(event.threadID, true);

  api.sendMessage(`Please wait... "${input}"`,event.threadID, event.messageID);




  
  try {
    const { data } = await axios.get(`https://api.kenliejugarap.com/freegpt4o8k/?question=${encodeURIComponent(input)}`);
    let response = response.data;
    response += "\n\n";
    api.shareContact(response,api.getCurrentUserID(), event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
