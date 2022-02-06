const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const { CaptchaGenerator } = require("captcha-canvas");

module.exports = {
    name: 'guildMemberAdd',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.GuildMember} member 
     */
    run: async (client, member) => {
      if(client.db["captcha"].get(`captcha_${member.guild.id}`) === "disable") return;

      if(client.db["captcha"].get(`captcha_${member.guild.id}`) === "enable") {
        try {

            const { user, guild } = member;
            let channel = member.guild.channels.cache.find(c => c.name === "verification")
            let ro = client.db["captcharole"].get(`r_${member.guild.id}`)
            let rf = member.guild.roles.cache.get(ro)
            let r = member.guild.roles.cache.find(ro => ro.name === "Non Vérifié")
             member.roles.add(r)
             const { Captcha } = require("discord.js-captcha");

             const captcha = new Captcha(client, {
                 guildID: member.guild.id,
                 roleID: ro,
                 channelID: channel.id, 
                 sendToTextChannel: false, 
                 kickOnFailure: true,
                 caseSensitive: false, 
                 attempts: 3, 
                 timeout: 30000, 
                 showAttemptCount: true, 
                 customPromptEmbed: new MessageEmbed().setTitle("Veuillez résoudre le captcha ci-dessous.").setColor('2f3136'), 
                 customSuccessEmbed: new MessageEmbed().setTitle(`✅`).setDescription(`**Vous avez été vérifié avec succès sur ${member.guild.name} !**`).setColor('2f3136'), 
                 customFailureEmbed: new MessageEmbed().setTitle(`❌`).setDescription(`**Vous avez échoué le captcha de ${member.guild.name}...**`).setColor('2f3136'), 
             });


        

             
        } catch (err) {
console.log(err)
        }
  
    }
      
    }
}