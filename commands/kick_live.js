const { SlashCommandBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick_live')
    .setDescription('announcement of going live on kick. with url link.'),
    async execute(interaction) {
        await interaction.reply('SuddenlyAri is now live on kick!\n' + '=> https://www.kick.com/suddenlyari');
    },
};
