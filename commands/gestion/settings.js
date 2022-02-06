const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'settings',
    aliases: ['settings'],

    /**
     * @param {Bot} client
     * @param {Discord.Message} message
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(`⚠️ **Vous n'avez pas la permission d'effectuer cette commande.**`)

       
    
     if(!args.length) {
         let embed = new Discord.MessageEmbed() 
         .setTitle(`**Paramètres RaidProtect**`)
         .setDescription(`Faites \`?settings [paramètre]\` pour plus d'informations sur un paramètre.`)
         .addField(`📃 Salon de logs`, "`?settings logs`", true)
         .addField(`💬 Suppression des commandes`, "`?settings delinvoke`", true)
         .addField(`🔱 Spam autorisé`, "`?settings allowspam`", true)
         .addField(`🎓 Niveau de sécurité anti-spam`, "`?settings spamlevel`", true)
         .addField(`🔰 Mode raid automatique`, "`?settings autoraidmode`", true)
         .setColor(`2f3136`)
         .setFooter({text: "RaidProtect Remake"})

         return message.channel.send({embeds : [embed]})
     }

     if(args[0] === "logs") {
         let ch = client.db['logs'].get(`logs_${message.guild.id}`, true, "aucun")
         let finalch = `${ch === "aucun" ? "aucun" : `<#${ch}>`}`

         let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
         if(!channel) {
         const embed = new Discord.MessageEmbed()
         .setTitle("**Paramètres RaidProtect - 📃 Salon de logs**")
         .setDescription(`Définit le salon utlisé pour les logs du bot`)
         .addField(`⌛ Paramètre actuel`, `${finalch}`)
         .addField(`✒️ Modifier le paramètre`, "`?settings logs [#salon]`")
         .setFooter({text: "Les modifications peuvent prendre jusqu'à 10 minutes à être prises en compte."})
         .setColor('2f3136')
         return message.channel.send({embeds : [embed]})
         }
         if(channel) {
             client.db['logs'].set(`logs_${message.guild.id}`, channel.id).save()
             let b = await client.db['logs'].get(`logs_${message.guild.id}`)
             message.guild.channels.cache.get(b).send(`:information_source: **Les logs RaidProtect sont définies sur ce salon !**`)
             return message.channel.send(`:white_check_mark: **Le salon de logs a bien été défini sur** ${channel} **!**`)
         }
     }

     if(args[0] === "delinvoke") {



     }

     if(args[0] === "allowspam") {
         if(!Array.isArray(client.db["antispam"].get(`channel_${message.guild.id}`))) { client.db["antispam"].set(`channel_${message.guild.id}`, []) }

         let chan = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
         if(!chan) {
            let allchan = client.db["antispam"].get(`channel_${message.guild.id}`)
            let finalchan = allchan === undefined ? "aucun" : `<#${allchan.join("> <#")}>`
            console.log(allchan)
             let embed = new Discord.MessageEmbed()
             .setTitle('Paramètres RaidProtect - 🔱 Spam autorisé')
             .setDescription(`Liste des salon ignorés par l'anti-spam.
             Pour supprimer un salon de la liste, faites \`?settings allowspam [#salon] remove\`.`)
             .addField(`⌛ Paramètre actuel`, `${finalchan}`)
             .addField('✒️ Ajouter un salon', '`?settings allowspam [#salon]`')
             .setFooter({ text : 'Les modifications peuvent prendre jusqu\'à 10 minutes à être prises en compte.'})
             .setColor('#2F3136')
             return message.channel.send({embeds : [embed]})
         }
         let remove = args[2] === "remove"

         if(chan && !remove) {
             if(client.db["antispam"].get(`channel_${message.guild.id}`).includes(chan.id)) {
                return message.channel.send(`:white_check_mark: **Le salon** ${chan} **est déjà ignoré par l'anti-spam !**`)
             }
             client.db["antispam"].push(`channel_${message.guild.id}`, chan.id).save()
             return message.channel.send(`:white_check_mark: **Le salon** ${chan} **est désormais ignoré par l'anti-spam !**`)
         }

         if(chan && remove) {
            if(!client.db["antispam"].get(`channel_${message.guild.id}`).includes(chan.id)) {
                return message.channel.send(`:white_check_mark: **Le salon** ${chan} **n'est pas ignoré par l'anti-spam !**`)
             }
            client.db["antispam"].remove(`channel_${message.guild.id}`, chan.id).save()
            return message.channel.send(`:white_check_mark: **Le salon** ${chan} **n'est plus ignoré par l'anti-spam !**`)
         }
     }

     if(args[0] === "spamlevel") {

        if(args[1] === "high") { 
            client.db["antispamlevel"].set(`spamlevel_${message.guild.id}`, "high").save();
            return message.channel.send(`**✅ Le niveau de sécurité anti-spam a été défini sur \`high\` !**`)
        }
        if(args[1] === "medium"){
            client.db["antispamlevel"].set(`spamlevel_${message.guild.id}`, "medium").save();
           return message.channel.send(`**✅ Le niveau de sécurité anti-spam a été défini sur \`medium\` !**`)
        }
        if(args[1] === "low"){
            client.db["antispamlevel"].set(`spamlevel_${message.guild.id}`, "low").save();
           return message.channel.send(`**✅ Le niveau de sécurité anti-spam a été défini sur \`low\` !**`)
        }
        
     }


    }
}