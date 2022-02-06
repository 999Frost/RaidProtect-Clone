const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
module.exports = {
    name: 'guildMemberAdd',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.GuildMember} member 
     */
    run: async (client, member) => {
        try {
            if(client.db["raidmode"].get(`raidmode_${member.guild.id}`) === "off") return;
            await member.user.send(`:information_source: **Vous avez été exclu de ${member.guild.name} car ce serveur est en mode raid !** Retentez de le rejoindre ultérieurement.`)
            await member.kick(`Serveur en mode raid`)
        } catch (err) {
            console.log("guildMemberAdd error : " + err)
        }
    }
}