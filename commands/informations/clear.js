const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'clear',
    aliases: ['clear'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{

            let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
            if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send(`⚠️ **Vous n'avez pas la permission d'effectuer cette commande.**`);
            }
            if (parseInt(args[0]) > 100) {
                return message.channel.send(`Vous ne pouvez supprimer que 100 messages à la fois`)
                .then((sent) => {
                  setTimeout(() => {
                    sent.delete();
                  }, 2500);
                })
              }
              
            if(!args[0]) return message.channel.send(`:warning: **Le paramètre \`num\` est manquant !**`).then((sent) => {
                setTimeout(function () {
                  sent.delete();
                }, 2500);
            })
        
                    if (!isNaN(message.content.split(' ')[1])) {
                      let amount = 0;
                      if (message.content.split(' ')[1] === '0' || message.content.split(' ')[1] === '0') {
                        amount = 1;
                      } else {
                        amount = message.content.split(' ')[1];
                        if (amount > 100) {
                          amount = 100;
                        }
                      }
                      if(!member) {
                      await message.channel.bulkDelete(amount, true).then((_message) => {
                        message.channel.send(`:white_check_mark: **${_message.size} messages** ont été supprimés !`).then((sent) => {
                          setTimeout(function () {
                            sent.delete();
                          }, 5000);
                        });
                      }).catch(error => {
                        message.channel.send("Erreur...", error)
                          console.log(error)
                    })
                    } 
                    if(member) {
                        let messages = (await message.channel.messages.fetch({
                            limit: amount,
                            before: message.id
                        })).filter(m => m.author.id === member.user.id)

                        if(messages.length === 0) return message.channel.send(`Il n'y a aucun message de cet utilisateur a supprimer.`)

                        
                        messages.forEach(m => m.delete())
                        message.channel.send(`:white_check_mark: **${amount} messages** ont été supprimés !`)
                            
                        
                    }
                }
            
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}