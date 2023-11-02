const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List of bot commands'),
    async execute(interaction) {
        await interaction.reply('```***Apollo\`s list of commands***\n' +
                                'Poe Blade\n' +
                                'FilterBlade\n' +
                                'Awakened\n' +
                                'Kick```');
    }
};