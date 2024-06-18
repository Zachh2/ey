const axios = require('axios');

const fs = require('fs-extra');

const path = require('path');

module.exports.config = {

  name: 'fbcover',

  version: '1',

  role: 0,

  credits: 'zach (api jonell)',

  hasPrefix: true,

  description: 'FB Cover Generator',

  commandCategory: 'fun',

  usage: 'name|color|address|subname| email|uid|sdt',

  cooldowns: 5

};

  module.exports.run = async ({ api, event, args }) => {

    const pathie = './enhanced.jpg';

    const { threadID, messageID } = event;

 const id = event.senderID

    const [name, color, address, email, subname, phoneNumber] = args.join(" ").split("|");

    try {

      api.sendMessage("⏱️ | Processing your request. Please wait....", event.threadID, event.messageID);

      const response = await axios.get(`https://fbcoverapi.adaptable.app/fbcover`, {

        responseType: 'arraybuffer',

        params: {

          name: name,

          color: color,

          address: address,

          email: email,

          subname: subname,

          uid: id,

          sdt: phoneNumber

        }

      });

      fs.writeFileSync(pathie, Buffer.from(response.data, 'binary'), 'binary');

      api.sendMessage({

        body: "🖼️ | Your request has been processed!",

        attachment: fs.createReadStream(pathie)

      }, threadID, () => fs.unlinkSync(pathie), event.messageID);

    } catch (error) {

      api.sendMessage(`❎ | Error processing request: ${error.message}`, event.threadID, event.messageID);


    }

  };

