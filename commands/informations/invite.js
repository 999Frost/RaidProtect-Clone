const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'invite',
    aliases: ['invite'],

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
            .setTitle(`📌 Liens`)
            .setDescription(`**[Serveur Discord](https://raidpro.tk/discord)**
            **[Site internet](https://raidprotect.org/)**
            [Documentation](https://docs.raidprotect.org/)`)
            .setFooter({text:`Pour en savoir plus sur RaidProtect Remake, faites ?about`})
            .setColor(`2f3136`)

            message.channel.send({embeds : [embed]})
            
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}