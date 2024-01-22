const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'embed',
    description: 'Replies with an embed',
  },
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x846fa4)
      .setTitle('"W E\'R E A L L M A D H E R E."')
      .setURL('https://discord.gg/Usbh46jHar')
      .setAuthor({ name: "Hello Human...\nw e l c o m e  t o  i r o n e d o m e.\n<-------------------------------------->  "})
      .setDescription('->please\n-->read\n--->the\n---->rules\n----->then\n------>react\n------->at\n-------->the\n--------->bottom\n----------> or\n-----------> you\n-------------> will\n--------------> never\n---------------> leave\n----------------> this\n-----------------> airlock.')
      .setThumbnail('https://discord.gg/Usbh46jHar')
      .addFields(
        { name: '\u200B', value: '\u200B'},
        { name: 'R U L E S:', value: '----------'},
        { name: 'Be Respectful', value: 'This means no mean, rude, or harassing comments. Treat others the way you want to be treated.', },
        { name: 'No Spamming', value: 'Do not send a lot of small messages right after each other. These disrupt the chat and make it hard to scroll through the server.',},
        { name: 'No Pornographic/adult/other NSFW material', value: "This server is meant to provide a safe place for us to share art, videos, advice, and other kinds of helpful material. if it's not marked as a NSFW channel please keep it family friendly",},
        { name: 'No blackmail, threats, harassment, hate speech, or racism, ', value: 'Do not engage in blackmail, threats, or harassment of any kind, whether in public or private messages.',},
        { name: 'No recruiting for other servers or communities', value: 'Do not recruit or promote other servers or communities in this server without prior approval from the server staff.',},
        { name: '\u200B', value: '\u200B' },
        { name: 'EVERYONE IS WELCOME HERE', value: ' ',},
        { name: '\u200B', value: '\u200B' },
        { name: 'No Hate, Just Love', value: '-------------------',}
      )
      .addFields({ name: 'CLICK', value: '👇it.',})
      .setImage('https://discord.gg/Usbh46jHar')
      .setTimestamp()
      .setFooter({ text: 'beanjuice❤️', iconURL: 'https://discord.gg/Usbh46jHar' });

    const messageResponse = await interaction.reply({ embeds: [exampleEmbed] });
    const fetchedMessage = await interaction.fetchReply();
    await fetchedMessage.react('👽')
  },
};