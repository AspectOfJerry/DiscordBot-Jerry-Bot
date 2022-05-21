const {Client, Intents, Collection, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

const Sleep = require('../../modules/sleep'); //delayInMilliseconds;
const Log = require('../../modules/logger'); //DEBUG, ERROR, FATAL, INFO, LOG, WARN; │, ─, ├─, └─;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription("Translator.")
        .addStringOption((options) =>
            options
                .setName('string')
                .setDescription("[REQUIRED] The string to translate.")
                .setRequired(true))
        .addStringOption((options) =>
            options
                .setName('to')
                .setDescription("[REQUIRED] The language to translate the string to.")
                .addChoice("English (English)", 'en')
                .addChoice("Français (French)", 'fr')
                .addChoice("German (German)", 'de')
                .addChoice("Español (Spanish)", 'es')
                .addChoice("中文 (Chinese Simplified)", 'zh-cn')
                .addChoice("Italiano (Italian)", 'it')
                .addChoice("日本語 (Japanese)", 'ja')
                .addChoice("한국어 (Korean)", 'ko')
                .addChoice("Tiếng Việt (Vietnamese)", 'vi')
                .addChoice("Português (Portuguese)", 'pt')
                .addChoice("Українська (Ukrainian)", 'uk')
                .addChoice("Polski (Polish)", 'pl')
                .addChoice("Svenska (Swedish)", 'sv')
                .addChoice("Türkçe (Turkish)", 'tr')
                .addChoice("Nederlands (Dutch)", 'nl')
                //.addChoice("Русский (Russian) #StandForUkraine", 'ru') #StandForUkraine
                .setRequired(true))
        .addStringOption((options) =>
            options
                .setName('from')
                .setDescription("[REQUIRED] The language to translate the string from.")
                .addChoice("Automatic", 'auto')
                .addChoice("English (English)", 'en')
                .addChoice("Français (French)", 'fr')
                .addChoice("German (German)", 'de')
                .addChoice("Español (Spanish)", 'es')
                .addChoice("中文 (Chinese Simplified)", 'zh-cn')
                .addChoice("Italiano (Italian)", 'it')
                .addChoice("日本語 (Japanese)", 'ja')
                .addChoice("한국어 (Korean)", 'ko')
                .addChoice("Tiếng Việt (Vietnamese)", 'vi')
                .addChoice("Português (Portuguese)", 'pt')
                .addChoice("Українська (Ukrainian)", 'uk')
                .addChoice("Polski (Polish)", 'pl')
                .addChoice("Svenska (Swedish)", 'sv')
                .addChoice("Türkçe (Turkish)", 'tr')
                .addChoice("Nederlands (Dutch)", 'nl')
                //.addChoice("Русский (Russian) #StandForUkraine", 'ru') #StandForUkraine
                .setRequired(true))
        .addBooleanOption((options) =>
            options
                .setName('ephemeral')
                .setDescription("[OPTIONAL] Whether you want the bot's messages to only be visible to yourself. Defaults to false.")
                .setRequired(false)),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "ROLE";

        //Declaring variables
        const is_ephemeral = interaction.options.getBoolean('ephemeral') || false;
        await Log(interaction.guild.id, `├─ephemeral: ${is_ephemeral}`, 'INFO');

        const string = interaction.options.getString('string');
        const original_language = interaction.options.getString('from');
        const target_language = interaction.options.getString('to');
        //Checks

        //Code
        interaction.reply({content: "This command is currently unavailable."})
        return;
    }
}