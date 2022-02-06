const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'prefix',
    aliases: ['setprefix'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{
            if(!message.member.permissions.has('MANAGE_GUILD') && !client.config.owners.includes(message.author.id)) return message.reply(`:x: You don't have the permission to use this command.`).catch(e=>{})
            let newprefix = args[0]
            if(!newprefix) return message.channel.send("You didn't gave me any prefix.").catch(e=>{})
            let currentprefix = client.db['settings'].get('prefix', true, client.config.prefix) || client.config.prefix
            if(newprefix===currentprefix) return message.channel.send(`The prefix is exacly the same of my current one.`).catch(e=>{})
            client.db['settings'].set('prefix', newprefix).save()
            message.channel.send(`My new prefix is \`${newprefix}\``).catch(e=>{})
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}