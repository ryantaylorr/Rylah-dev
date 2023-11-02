const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('current bot status'),
    async execute(interaction) {
        await interaction.reply('active.');

    },
};