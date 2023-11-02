const { SlashCommandBuilder, AutoModerationRuleKeywordPresetType } = require('discord.js');
const { execute } = require('./kick_live');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('retro_archive')
        .setDescription('List of old hardware/software'),
    async execute(interaction) {
        await interaction.reply('https://www.vimm.net');

    },
};