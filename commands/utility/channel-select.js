const { MessageEmbed, Embed, EmbedBuilder } = require('discord.js');



module.exports = {
  data: {
    name: 'channelselect',
    description: '(Admin Only)=Posts an embed into the channel-select for roles.',
  },

  async execute(interaction) {
    

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x846fa4)
      .setTitle('Room-List')
      .setURL('https://discord.gg/Usbh46jHar')
      .setDescription('Please read the room list below.\n React to the corrosponding emoji at the bottom of this message to unlock specific channels.')
      .setThumbnail('https://discord.gg/Usbh46jHar')
      .addFields(
        { name: 'Dungeons & Dragons', value: '🧙🏻‍♀️',},
        { name: 'Food/Cooking', value: '🥑',},
        { name: 'Gaming (PC and Console)', value: '🎮',},
        { name: 'Going Live (Announcing Live Streams)', value: '📸', },
        { name: 'Inkredible Inspiration', value: '🪡',},
        { name: 'Minecraft', value: '⛏️', },
        { name: 'NSFW-Memes', value: '⚠️',},
        { name: 'NSFW-Memes', value: '🐱',},
        { name: 'Photos Art Nature', value: '🖼️',},
        { name: 'Shooting Range', value: "🔫",},
        { name: 'Sticky Green and Bar', value: '🪴',},
        { name: 'Think-Tank(computer hardware/software talk)', value: '💻',},
        { name: 'Irondome Trucking (ATS/ETS Trucking Sim)', value: '🚚',},
        { name: 'Ali\'s Cow Channel', value: '🐮'},
        { name: 'EVE Big Kills:', value: '☠️'},
      )
      .addFields({ name: 'React to emojis below to gain access to channels you want.', value: ' ',})
      .setImage('https://discord.gg/Usbh46jHar')
      .setTimestamp()
      
      

    sentMessage = await interaction.reply({ embeds: [exampleEmbed] });
    fetchedMessage = await interaction.fetchReply();
    await fetchedMessage.react('🧙🏻‍♀️');
    await fetchedMessage.react('🥑');
    await fetchedMessage.react('🎮');
    await fetchedMessage.react('📸');
    await fetchedMessage.react('🪡');
    await fetchedMessage.react('⛏️');
    await fetchedMessage.react('⚠️');
    await fetchedMessage.react('🐱');
    await fetchedMessage.react('🖼️');
    await fetchedMessage.react('🔫');
    await fetchedMessage.react('🪴');
    await fetchedMessage.react('💻');
    await fetchedMessage.react('🚚');
    await fetchedMessage.react('🐮');
    await fetchedMessage.react('☠️');
  },
};