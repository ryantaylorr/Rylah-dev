const { token, guildId, clientId, discordChannel } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const { readdirSync } = require('fs');
const { Client, Events, GatewayIntentBits, Partials, ActivityType, Collection, EmbedBuilder } = require('discord.js');
const { ReactionRole } = require("discordjs-reaction-role");
const axios = require('axios');
const querystring = require('querystring');
const Redis = require('ioredis');



// CLIENT // 

const client = new Client({
  partials: [Partials.Message, Partials.Reaction],
  intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates],
});


// -------------------------------------------------------------------------------------------------------------------
// ----------COMMAND HANDLING---------------------------------------------------------------------------------------

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
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
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



// REACTION ROLES.

const rr = new ReactionRole(client, [
  { messageId: "1187213475223715971", reaction: "👽", roleId: "1168919016895696986" }, // airlock
  { messageId: "1198126554648158242", reaction: "🖼️", roleId: "1187094813183594555" }, // Art
  { messageId: "1198126554648158242", reaction: "🧙🏻‍♀️", roleId: "1187085370798657578" }, // DnD
  { messageId: "1198126554648158242", reaction: "🥑", roleId: "1187094602650484796" } , // Food
  { messageId: "1198126554648158242", reaction: "📸", roleId: "1187085583642800208" } , // Going Live
  { messageId: "1198126554648158242", reaction: "🪡", roleId: "1187085772902383646" }, // Ink
  { messageId: "1198126554648158242", reaction: "⛏️", roleId: "1187085615116849233" }, // MC
  { messageId: "1198126554648158242", reaction: "⚠️", roleId: "1187085821443051540" }, // NSFW Memes
  { messageId: "1198126554648158242", reaction: "🎮", roleId: "1187101577220198550" }, // Gaming
  { messageId: "1198126554648158242", reaction: "🔫", roleId: "1187085893895463033" }, // Guns
  { messageId: "1198126554648158242", reaction: "🐱", roleId: "1187094842329800754" }, // Pets
  { messageId: "1198126554648158242", reaction: "🪴", roleId: "1187085925168185434" }, // Sticky Green
  { messageId: "1198126554648158242", reaction: "💻", roleId: "1187086089719119922" }, // Think Tank
  { messageId: "1198126554648158242", reaction: "🚚", roleId: "1187086116269072467" }, // Trucking
  { messageId: "1198126554648158242", reaction: "🐮", roleId: "1187086195767914558" }, // Cows
  { messageId: "1198126554648158242", reaction: "☠️", roleId: "1198126888833515591" }  // Killmails 
]);

const queueID = 'AriKillBot'; // Replace with your desired queueID
const apiUrl = `https://redisq.zkillboard.com/listen.php?queueID=${queueID}&ttw=1`;
const ISK_THRESHOLD = 10000; // 100 million ISK
const YOUR_DISCORD_CHANNEL_ID = '1198127043309752442';


async function getInfoById(type, id) {
  try {
    const response = await axios.get(`https://esi.evetech.net/latest/${type}/${id}/`);
    return response.data.name;
  } catch (error) {
    
    return null;
  }
}

async function fetchKillmails() {
  try {
    const queueID = 'BotMeRylah'; // queueID
    let apiUrl = `https://redisq.zkillboard.com/listen.php?queueID=${queueID}&ttw=1`; 
    let shouldProcessKillmails = true;

    while (shouldProcessKillmails) {
      const response = await axios.get(apiUrl);
      const killmail = response.data.package;

      if (killmail !== null && killmail.killmail && killmail.killmail.victim) {
       // console.log('Received Killmail:', killmail);

        try {
          const victim = killmail.killmail.victim;

          // Fetching names based on IDs
          const allianceName = await getInfoById('alliances', victim.alliance_id);
          const corporationName = await getInfoById('corporations', victim.corporation_id);
          const characterName = await getInfoById('characters', victim.character_id);
          const shipTypeId = killmail.killmail.victim.ship_type_id;
          const shipName = await getInfoById('universe/types', shipTypeId);
          const solarSystemId = killmail.killmail.solar_system_id;
          const solarSystemName = await getInfoById('universe/systems', solarSystemId);
          const killID = killmail.killID;
          const killmailLink = `https://www.zkillboard.com/kill/${killID}/`;

         
          // Check if total loss is over 100 million ISK
          const iskValue = killmail.zkb.totalValue;
          if (iskValue >= 5000000000) {
            // Process and post to Discord
          console.log(`BIG KILL FOUND: -> ISK value ${iskValue.toLocaleString()} ISK:`);
          console.log(' ---------------------------------------------');
          console.log('| Character Name:', characterName);
          console.log('| Corporation Name:', corporationName);
          console.log('| Alliance Name:', allianceName);
          console.log('| Ship Name:', shipName);
          console.log('| Solar System:', solarSystemName);
          console.log(killmail);
          console.log(' -----------------------------------------------');
            // Create an embed for Discord
            const embed = new EmbedBuilder()
              .setColor(0x623878)
              .setTitle('BIG KILL DETECTED:')
              .setURL(killmailLink)
              .addFields(
                { name: 'Victim Name:', value: characterName || 'N/A' },
                { name: 'Ship:', value: shipName || 'N/A' },
                { name: 'Corporation:', value: corporationName || 'N/A' },
                { name: 'Alliance:', value: allianceName || 'N/A' },
                { name: 'System:', value: solarSystemName || 'N/A' },
                { name: 'ISK Value:', value: `${iskValue.toLocaleString()} ISK` }
              
              )
              .setThumbnail(`https://images.evetech.net/types/${shipTypeId}/icon`)
              .setFooter({ text: 'R\'ylah ❤️', iconURL: 'https://images.evetech.net/characters/1563049248/portrait?size=128' });
            // Replace 'YOUR_DISCORD_CHANNEL_ID' with the actual Discord channel ID
            const channel = client.channels.cache.get(YOUR_DISCORD_CHANNEL_ID);

            // Send the embed to Discord
            channel.send({ embeds: [embed] });
          } else {
            // Log to console for killmails under 100 million ISK
            console.log('---------------------------------------------------------------');
            console.log(`| Killmail Found: ISK value ${iskValue.toLocaleString()} ISK: ..... ignoring.`); 
            console.log('---------------------------------------------------------------')
          }
        } catch (error) {
          
        }} else {
          console.log('No New Killmail... Still Checking...')
        }
      // Update the apiUrl with the latest kill ID
      apiUrl = `https://redisq.zkillboard.com/listen.php?queueID=${queueID}&ttw=1&killID=${killmail?.killID || ''}`;
    }
  } catch (error) {
    
  }
}


// Start fetching killmails
fetchKillmails();

 
    
// Log In / Set Status / Initiate Reaction Roles
client.on('ready', async () => {
  try {
    console.log('Bot Active.');
    client.user.setActivity('everything.', { type: ActivityType.Watching });

    // Start the killmail listener
    

    // ... (existing code)
  } catch (error) {
    console.error('Error during initialization:', error.message);
  }
});

client.login(token);
