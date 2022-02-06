const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'stats',
    aliases: ['stats'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{

            const embed = new Discord.MessageEmbed()
            .setTitle(`Statistiques`)
            .setDescription(`Nombre de serveurs : **${client.guilds.cache.size}**\nNombre d'utilisateurs : **${client.users.cache.size}**`)
            .setFooter({text:`RaidProtect Remake`})
            .setColor(`NOT_QUITE_BLACK`)

            message.channel.send({embeds : [embed]})
            
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}