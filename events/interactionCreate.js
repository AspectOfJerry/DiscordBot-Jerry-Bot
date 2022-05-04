const {Client, Intents, Collection, MessageEmbed} = require('discord.js');

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if(!interaction.isCommand()) {
            return;
        }

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) {
            return;
        }
        try {
            await command.execute(interaction.client, interaction);
        } catch(err) {
            if(err) {
                console.error(err);
                const execute_error = new MessageEmbed()
                    .setColor('#bb20ff')
                    .setTitle('Error')
                    .setDescription("An error occured while executing the command. No further information is available.")
                    .setTimestamp();

                await interaction.reply({embeds: [execute_error], ephemeral: false});
            }
        }
    }
}