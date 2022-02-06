const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    aliases: ['kick'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let r = args.slice(1).join(' ')
        let reason;
        if(!r) reason = "Aucune raison fournie"
        if(r) reason = r
        try{
if(!member) return message.channel.send(`:warning: **Le paramètre \`member\` est manquant !**`)
if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(member.id).roles.highest) <= 0) return message.channel.send(`:warning: **Impossible d'expulser ${member.user.tag}**. Veuillez vérifier la hiérarchie des rôles.`)
if(!member.kickable) return message.channel.send(`:warning: **Impossible d'expulser ${member.user.tag}**. Veuillez vérifier la hiérarchie des rôles.`)
member.kick({reason: reason})
message.channel.send(`:white_check_mark: **${member.user.tag} a été expulsé !** (Raison : ${reason})`)

if(logs === "aucun") return

else{
    let embed = new Discord.MessageEmbed()
    .setAuthor({name: `Expulsion`, iconURL: member.user.displayAvatarURL()})
    .addField(`Membre`, `\`${member.user.tag}\` (<@${member.user.id}>)`, true)
    .addField(`Modérateur`, `\`${message.author.tag}\` (<@${message.author.id}>)`, true)
    .addField(`Raison`, `${reason}`, false)
    .setTimestamp()
    .setColor("FF0000");

    client.channels.cache.get(logs).send({embeds : [embed]});

}
           
            
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}