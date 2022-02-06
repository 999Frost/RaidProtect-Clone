const {Bot} = require('../../structures/client')
const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'userinfo',
    aliases: ['ui'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        try{

            const embed = new Discord.MessageEmbed()
            .setAuthor({name: member.user.tag, iconURL: member.user.avatarURL({dynamic: true})})
            .setThumbnail(`${member.user.avatarURL({dynamic: true})}`)
            .addField(`**Création du compte**`, `Le ${moment(member.user.createdAt).format(`L`)} (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`, true)
            .addField(`**Membre de ce serveur**`, `A rejoint le ${moment(member.joinedAt).format(`L`)} (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`, true)
            .setFooter({text:`ID : ${member.user.id}`})
            .setColor(`2f3136`)

            message.channel.send({embeds : [embed]})
            
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}