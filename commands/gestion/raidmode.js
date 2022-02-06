const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'raidmode',
    aliases: ['raidmode'],

    /**
     * @param {Bot} client
     * @param {Discord.Message} message
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply(`⚠️ **Vous n'avez pas la permission d'effectuer cette commande.**`)


        let raidmode = client.db["raidmode"].get(`raidmode_${message.guild.id}`, true, "off")

        if(raidmode === "on") {
            client.db["raidmode"].set(`raidmode_${message.guild.id}`, "off").save()
            const embed = new Discord.MessageEmbed()
            .setDescription(`:white_check_mark: Le mode raid a été désactivé avec succès !`)
            .setColor("GREEN")
            
        let logs = await client.db["logs"].get(`logs_${message.guild.id}`); 

        if(logs !== "aucun"){
            let embed = new Discord.MessageEmbed()
            .setDescription(`:information_source: **Le mode raid a été activé par ${message.author.username} **`)
            .setColor("ORANGE");
            
            message.guild.channels.cache.get(logs).send({embeds : [embed]});
        
        } else {
            return;
        }
            return message.channel.send({embeds : [embed]})
            
        } else {
            client.db["raidmode"].set(`raidmode_${message.guild.id}`, "on").save()
            const embed = new Discord.MessageEmbed()
            .setDescription(`:white_check_mark: Le mode raid a été activé avec succès !`)
            .setFooter({text: `Il est désormais impossible de rejoindre ce serveur.`})
            .setColor(`FF0000`)

            let logs = await client.db["logs"].get(`logs_${message.guild.id}`); 

        if(logs !== "aucun"){
            let embed = new Discord.MessageEmbed()
            .setDescription(`:information_source: **Le mode raid a été déactivé par ${message.author.username} **`)
            .setColor("ORANGE");
            
            message.guild.channels.cache.get(logs).send({embeds : [embed]});
        
        } else {
            return;
        }
            return message.channel.send({embeds : [embed]})
        }
       



    }
}