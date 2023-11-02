const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poe_filter')
		.setDescription('Replies with Filter Blade website'),
	async execute(interaction) {
		await interaction.reply('https://www.filterblade.xyz');
	},
};