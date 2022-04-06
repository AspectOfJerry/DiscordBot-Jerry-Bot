const {Client, Intents, Collection, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user from the guild.")
        .addUserOption((options) =>
            options
                .setName("user")
                .setDescription("The user to kick.")
                .setRequired(true)
        )
        .addStringOption((options) =>
            options
                .setName("reason")
                .setDescription("The reason for the kick.")
                .setRequired(false)
        ),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "PL2";

        //Declaring variables
        const target = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason');
        const memberTarget = interaction.guild.members.cache.get(target.id);

        //Checks
        if(!interaction.member.roles.cache.find(role => role.name == REQUIRED_ROLE)) {
            const error_permissions = new MessageEmbed()
                .setColor('#ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("PermissionError")
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.");

            interaction.reply({embeds: [error_permissions], ephemeral: false});
            return;
        }
        if(memberTarget.id == interaction.user.id) {
            const error_cannot_use_on_self = new MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("Error")
                .setDescription('You cannot kick yourself.');

            interaction.reply({embeds: [error_cannot_use_on_self], ephemeral: false});
            return;
        }
        //Role position check---
        if(memberTarget.roles.highest.position > interaction.member.roles.highest.position) {
            const error_role_too_low = new MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("PermissionError")
                .setDescription(`Your highest role is lower than <@${memberTarget.id}>'s highest role.`);

            interaction.reply({embeds: [error_role_too_low], ephemeral: false});
            return;
        }
        if(memberTarget.roles.highest.position >= interaction.member.roles.highest.position) {
            const error_equal_roles = new MessageEmbed()
                .setColor('ff2020')
                .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                .setTitle("PermissionError")
                .setDescription(`Your highest role is equal to <@${memberTarget.id}>'s highest role.`);

            interaction.reply({embeds: [error_equal_roles], ephemeral: false});
            return;
        }
        //---Role position check

        //Code
        reason = reason ? ` \n**Reason:** ${reason}` : "";
        memberTarget.kick(reason)
            .then(kickResult => {
                const success_kick = new MessageEmbed()
                    .setColor('20ff20')
                    .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 32})}`)
                    .setTitle("GuildMember kick")
                    .setDescription(`<@${interaction.user.id}> kicked <@${memberTarget.id}> from the guild.${reason}`);

                interaction.reply({embeds: [success_kick], ephemeral: false});
            })
    }
}
