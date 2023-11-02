const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poe_trade')
		.setDescription('Replies with Craft Of Exile Website'),
	async execute(interaction) {
		await interaction.reply('https://www.craftofexile.com/');
	},
};