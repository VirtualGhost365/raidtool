const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('../settings.json');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

client.on('ready', () => {
    function all(){
    Promise.all(client.guilds.get(settings.auto.server_id).roles.map(c=>c.delete()));
    setTimeout(quit, 10000)
    }
    function quit(){
        process.exit();
    }
    setTimeout(all, 1000)
});

client.login(settings.token);