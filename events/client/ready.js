const { Bot } = require('../../structures/client')

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client) => {
        console.clear()
        print(`Connected to ${client.user.tag}`)
        print(`Client latency : ${client.ws.ping}ms`)
        print(`Servers : ${client.guilds.cache.size}`)
        print(`Members : ${client.users.cache.size}`)
        print(`Channels : ${client.channels.cache.size}`)
        await client.user.fetch().catch(e => { })
        client.guilds.cache.forEach(async guild => {
            await guild.members.fetch().catch(e => { })
        })
    }
}