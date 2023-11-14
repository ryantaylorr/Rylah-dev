const fs = require('node:fs');
const path = require('node:path');
const { ReactionRole } = require("discordjs-reaction-role");
const { Client, IntentBits, EmbedBuilder, Collection, Events, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { token } = require('./config.json');


const client = new Client({ 
	partials: [Partials.Message, Partials.Reaction],
	intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates] });

	const configuration = [
	{
		messageId: "1169350174255095869",
		reaction: "👽",
		roleId: "1168919016895696986",
	},
];

const rr = new ReactionRole(client, [
  { messageId: "1169350174255095869", reaction: "👽", roleId: "1168919016895696986" }, // Basic usage
  { messageId: "1169716012120297542", reaction: "🌲", roleId: "1169715386439188561" },
  { messageId: "nil", reaction: "nil", roleId: "nil" } ,
  { messageId: "nil", reaction: "nil", roleId: "nil" } ,
  { messageId: "12341234", reaction: "784536908345", roleId: "5959859598" }, // Custom emoji by ID
  { messageId: "12341234", reaction: "worry", roleId: "5959859598" }, // Custom emoji by emoji name
]);

const manager = new ReactionRole(client, configuration);

let badBot = ["bot", "stupid",];

client.on("messageCreate", message => {
if (message.author.bot) return;

if (message.content.includes('whoami')) {
	message.channel.send(message.member.user.tag)
}
if (message.content.toLowerCase().includes('skynet')) {
	message.channel.send('Did somone say skynet 🕵️👀')
}
if (message.content.toLowerCase().includes('cum')) {
	message.react('💦')
}
 if ((message.content.includes("stupid") && message.content.includes("bot")) ||
      (message.content.includes("bot") && message.content.includes("stupid"))) {
	message.react('🤖');
	message.react('💻');
	message.channel.send('WHAT');
	message.channel.send('(╯°□°)╯︵ ┻━┻');
	message.channel.send('oh, sorry');
	message.channel.send('here... ┬─┬ノ( º _ ºノ)')
}
if (message.content.toLowerCase() === 'hey bot') {
	message.reply("https://gifdb.com/images/high/obi-wan-kenobi-well-hello-there-hzgui7yr5ketac2c.gif")
}
});


client.once(Events.ClientReady, c => {
	console.log('Bot Active.');

	client.user.setActivity({
		name: "everything.",
		type: ActivityType.Listening,
	});
});

client.login(token);
 
