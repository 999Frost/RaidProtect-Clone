const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'about',
    aliases: ['about'],

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
            .setTitle(`📌 **À propos de RaidProtect**`)
            .setDescription(`👋 **Présentation**.
            RaidProtect est l'un des **meilleurs bots anti-raid francophones**. Sa mission est **d'empêcher les raids sur vos serveurs** tout en étant accessible à tous.
            Pour cela, il dispose de plusieurs cordes à son arc. Il utilise notamment **son anti-spam intelligent** et son mode raid automatique.
            De plus, il dispose d'un **captcha pour bloquer les selfbots** avant même qu'ils aient accès à votre serveur.
            👉 **RaidProtect est en constante amélioration !** Rejoignez le serveur support pour être informé des dernières nouveautés.`)
            .addField(`🔎 **Fonctionnalités**`, `🛡️ Un **anti-spam et anti-raid** intelligent et réactif.
            🔎 Un **captcha pour bloquer les selfbots.**
            🚧 Un **mode raid automatique et manuel**, pour empêcher les utilisateurs de rejoindre votre serveur pendant un raid.
            🔒 Un système de **verrouillage des salons**.
            🛠️ Une **configuration et utilisation** facile et intuitive.`)
            .addField(`📍 Liens`, `**[Serveur Discord](https://raidpro.tk/discord)**
            **[Site internet](https://raidprotect.org/)**
            [Documentation](https://docs.raidprotect.org/)`)
            .setFooter({text:`RaidProtect Remake`})
            .setColor(`2f3136`)

            message.channel.send({embeds : [embed]})
            
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}