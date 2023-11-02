const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('awakened_trade')
		.setDescription('Replies with Awakened trade install'),
	async execute(interaction) {
		await interaction.reply('https://snosme.github.io/awakened-poe-trade/download');
	},
};
