const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
const antispam = new Map()
module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, message) => {
        try {
           let lvl = client.db["antispamlevel"].get(`spamlevel_${message.guild.id}`)

           if(lvl === "low") {
            if(message.author.id === client.user.id) return;
            if(message.author.id === message.guild.ownerId) return;
          if(antispam.has(message.author.id)) {
         const user = antispam.get(message.author.id)
         let {msg} = user
         msg += 1
         user.msg = msg
         antispam.set(message.author.id, user)
         if(msg === 6) {
             message.delete()
             return message.channel.send(`${message.author}, vous envoyez des messages trop rapidement.`)
         }
         if(msg === 9) {
             message.guild.members.cache.get(message.author.id).kick()
             return message.channel.send(`:no_entry: **${message.author.tag}** a été expulsé pour spam !`)
         }
          } else {
              antispam.set(message.author.id, {
                  msg: 1
              })
              setTimeout(() => {
                antispam.delete(message.author.id)
              }, 10000);
          }
        }


           if(lvl === "medium") {
            if(message.author.id === client.user.id) return;
            if(message.author.id === message.guild.ownerId) return;
          if(antispam.has(message.author.id)) {
         const user = antispam.get(message.author.id)
         let {msg} = user
         msg += 1
         user.msg = msg
         antispam.set(message.author.id, user)
         if(msg === 4) {
             message.delete()
             return message.channel.send(`${message.author}, vous envoyez des messages trop rapidement.`)
         }
         if(msg === 7) {
             message.guild.members.cache.get(message.author.id).kick()
             return message.channel.send(`:no_entry: **${message.author.tag}** a été expulsé pour spam !`)
         }
          } else {
              antispam.set(message.author.id, {
                  msg: 1
              })
              setTimeout(() => {
                antispam.delete(message.author.id)
              }, 10000);
          }
           }


           if(lvl === "high") {
            if(message.author.id === client.user.id) return;
            if(message.author.id === message.guild.ownerId) return;
          if(antispam.has(message.author.id)) {
         const user = antispam.get(message.author.id)
         let {msg} = user
         msg += 1
         user.msg = msg
         antispam.set(message.author.id, user)
         if(msg === 3) {
             message.delete()
             return message.channel.send(`${message.author}, vous envoyez des messages trop rapidement.`)
         }
         if(msg === 5) {
             message.guild.members.cache.get(message.author.id).kick()
             return message.channel.send(`:no_entry: **${message.author.tag}** a été expulsé pour spam !`)
         }
          } else {
              antispam.set(message.author.id, {
                  msg: 1
              })
              setTimeout(() => {
                antispam.delete(message.author.id)
              }, 10000);
          }
           }
        } catch (err) {
            console.log("messageCreate error : " + err)
        }
    }
}