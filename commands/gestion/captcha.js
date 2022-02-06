const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'captcha',
    aliases: ['captcha'],

    /**
     * @param {Bot} client
     * @param {Discord.Message} message
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`⚠️ **Vous n'avez pas la permission d'effectuer cette commande.**`)

        let ch = client.db['captchalogs'].get(`captchalogs_${message.guild.id}`, true, "aucun")

       if(!args.length){
           if(client.db["captcha"].get(`captcha_${message.guild.id}`) === "disable") {
           let embed = new Discord.MessageEmbed()
           .setDescription(`:warning: **Le captcha est désactivé sur ce serveur.** Pour l'activer, faites \`?captcha enable\`
           [En savoir plus sur le captcha](https://docs.raidprotect.org/fonctionalites/captcha)`)
           .setColor(`2f3136`)
           .setFooter({text: "RaidProtect Remake"})
           return message.channel.send({embeds : [embed]})
           } else {
       let embed = new Discord.MessageEmbed()
       .setTitle("🛡 Paramètres du captcha")
       .setDescription('[En savoir plus - Aide](https://docs.raidprotect.org/fonctionalites/captcha)')
       .addField('📃 Logs du captcha', `\`?captcha logs [#salon]\``, true)
       .addField('👊 Rôle automatique', `\`?captcha autorole [@role]\``)
       .addField('❌ Désactiver le captcha', `\`?captcha disable\``)
       .setColor('#2F3136')
       .setFooter({text : "🚀 RaidProtect Remake"})

       return message.channel.send({embeds: [embed]});
           }
       }
    if(args[0] === "logs"){
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]); 
        if(!channel) return message.channel.send(`:warning: Le paramètre \`logs_chan\` est manquant !`); 

        client.db["captchalogs"].set(`captchalogs_${message.guild.id}`, channel.id).save();
        message.channel.send(`**:white_check_mark: Le salon de logs du captcha a bien été défini sur <#${channel.name}>.**`)
        channel.send(`**:information_source: Les logs du captcha RaidProtect sont définies sur ce salon !**`); 
    }

    if(args[0] ==="autorole") {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if(!role) return message.channel.send(`:warning: **Veuillez vérifier les paramètres de la commande et réessayer.**`)
        client.db["captcharole"].set(`role_${message.guild.id}`, role.id).save()
        return message.channel.send(`:white_check_mark: **Le rôle \`${role.name}\` sera automatiquement attribué aux nouveaux membres.**`)
    }

    if(args[0] === "disable"){
        if(client.db["captcha"].get(`captcha_${message.guild.id}`) === "disable") return message.channel.send(`:warning: Le captcha est déjà désactivé !`); 
        client.db["captcha"].set(`captcha_${message.guild.id}`, "disable").save();
        message.channel.send(`:white_check_mark: Le captcha a bien été désactivé !`); 
    }

    if(args[0] === "enable") {
        if(client.db["captcha"].get(`captcha_${message.guild.id}`) === "enable") return message.channel.send(`:warning: Le captcha est déjà activé !`); 
        client.db["captcha"].set(`captcha_${message.guild.id}`, "enable").save();
        message.channel.send(`:white_check_mark: Le captcha a bien été activé !`); 
        let r = await message.guild.roles.create({data: {
            name: "Non Vérifié",
            permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
            mentionable: false
        }})

        client.db["captcharole"].set(`r_${message.guild.id}`, r.id)
        let ro = message.guild.roles.cache.find(r => r.name === "@everyone")
        let ch = await message.guild.channels.create("verification", {
            nsfw: false,
            reason: "Activation du Captcha",
            type: "text",
        })
    r.setName("Non Vérifié")

        message.guild.channels.cache.forEach(c => c.permissionOverwrites.edit(r, {
            VIEW_CHANNEL: true,
            reason: "Activation du Captcha"
        }))
        await ch.permissionOverwrites.edit(ro, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: true
        })
        await ch.permissionOverwrites.edit(r, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
client.db["captchach"].set(`ch_${message.guild.id}`, ch.id)

        
    }
    }
}