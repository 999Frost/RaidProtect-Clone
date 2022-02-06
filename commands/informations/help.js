const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['help'],

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
            .setTitle(`📌 Aide RaidProtect`)
            .setDescription(`📚 **Pour une aide plus complète, référez-vous à la [documentation](https://docs.raidprotect.org/).
            Faites \`?about\` pour en savoir plus sur RaidProtect.**`)
            .addField(`🔨 **Commandes de gestion**`, `\`?raidmode\`: Active ou désactive le mode raid (impossible de rejoindre le serveur). \n*Permission: Expulser des membres*
            \`?lock|?unlock [salon]\`: Verrouille ou déverrouille le salon spécifié (impossible de parler). \n*Permission: Gérer les messages*
            \`?settings\`: Permet de modifier les paramètres du bot. \n*Permission: Administrateur*
            \`?captcha\`: Permet de modifier les paramètres du captcha. \n*Permission: Administrateur*`)
            .addField(`🔥 **Commandes de modération**`, `\`?ban [@utilisateur] [raison]\` Bannit l'utilisateur mentionné\n *Permissions: Bannir des membres*
            \`?kick [@utilisateur] [raison]\` Expulse l'utilisateur mentionné \nPermissions: Expulser des membres`)
            .addField(`📦 **Autres commandes**`, `\`?invite\`: Affiche les différents liens en rapport avec RaidProtect.
            \`?clear [nombre de messages] (@utilisateur)\` Supprime un certain nombre de messages (d'un utilisateur, si spécifié) dans le salon où est effectuée la commande. \nPermission: Gérer les messages
            \`?stats\`: Permet d'afficher des statistiques instantanées sur le bot.
            \`?userinfo [@utilisateur]\`: Affiche des informations sur l'utilisateur mentionné.`)
            .addField(`📍 **Informations**`, `**[Serveur Discord](https://raidpro.tk/discord)**
            **[Site internet](https://raidprotect.org/)**
            [Documentation](https://docs.raidprotect.org/)`)
            .setFooter({text:`RaidProtect Remake - Made with ❤️ by 999.Frost#0999`})
            .setColor(`2f3136`)

            message.reply({embeds : [embed]})
            
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}