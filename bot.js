const { token, guildId, clientId, discordChannel } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { readdirSync } = require('fs');
const { Client, Events, GatewayIntentBits, Partials, ActivityType, Collection, EmbedBuilder } = require('discord.js');
const { ReactionRole } = require("discordjs-reaction-role");
const axios = require('axios');


////////////
// CLIENT // 
////////////
const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates],
});


//////////////////////
// COMMAND HANDLING //
//////////////////////
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
		if ('data' in command && 'execute' in command) {
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


// -------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


////////////////////
// REACTION ROLES.//
////////////////////

const discordAirlockMessage = "1187213475223715971";
const discordRoleMessage = "1264762803554619504";
const rr = new ReactionRole(client, [
  { messageId: discordAirlockMessage, reaction: "👽", roleId: "1168919016895696986" }, // airlock
  { messageId: discordRoleMessage, reaction: "🖼️", roleId: "1187094813183594555" }, // Art
  { messageId: discordRoleMessage, reaction: "🧙🏻‍♀️", roleId: "1187085370798657578" }, // DnD
  { messageId: discordRoleMessage, reaction: "🥑", roleId: "1187094602650484796" } , // Food
  { messageId: discordRoleMessage, reaction: "📸", roleId: "1187085583642800208" } , // Going Live
  { messageId: discordRoleMessage, reaction: "🪡", roleId: "1187085772902383646" }, // Ink
  { messageId: discordRoleMessage, reaction: "⛏️", roleId: "1187085615116849233" }, // MC
  { messageId: discordRoleMessage, reaction: "⚠️", roleId: "1187085821443051540" }, // NSFW Memes
  { messageId: discordRoleMessage, reaction: "🎮", roleId: "1187101577220198550" }, // Gaming
  { messageId: discordRoleMessage, reaction: "🔫", roleId: "1187085893895463033" }, // Guns
  { messageId: discordRoleMessage, reaction: "🐱", roleId: "1187094842329800754" }, // Pets
  { messageId: discordRoleMessage, reaction: "🪴", roleId: "1187085925168185434" }, // Sticky Green
  { messageId: discordRoleMessage, reaction: "💻", roleId: "1187086089719119922" }, // Think Tank
  { messageId: discordRoleMessage, reaction: "🚚", roleId: "1187086116269072467" }, // Trucking
  { messageId: discordRoleMessage, reaction: "🐮", roleId: "1187086195767914558" }, // Cows
  { messageId: discordRoleMessage, reaction: "🤖", roleId: "1264394283356782662" }, // Overseer
  { messageId: discordRoleMessage, reaction: "🛰️", roleId: "1264394075172241430" }, // Radarr
  { messageId: discordRoleMessage, reaction: "📡", roleId: "1264394127223685245" }, // Sonarr
  { messageId: discordRoleMessage, reaction: "🖥️", roleId: "1264394173344383077" }, // Systems
]);




//////////////////////////////////////////////////
// Log In / Set Status / Initiate Reaction Roles//
//////////////////////////////////////////////////
client.once('ready', async () => {
    console.log('Bot Active.');
    client.user.setPresence({
    status: 'dnd',
    activities: [{
      type: ActivityType.Watching,
      name: '👽 The Void.',
    }]
  })
}); 
 


client.login(token);
