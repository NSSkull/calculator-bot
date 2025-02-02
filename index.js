const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const math = require('mathjs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const token = 'your_token';
const clientId = 'your_client_id';
const guildId = 'your_guild_id';

const prefix = '/';

const commands = [
  new SlashCommandBuilder().setName('add').setDescription('Adds two numbers').addNumberOption(option =>
    option.setName('num1').setDescription('First number').setRequired(true)).addNumberOption(option =>
    option.setName('num2').setDescription('Second number').setRequired(true)),

  new SlashCommandBuilder().setName('subtract').setDescription('Subtracts num2 from num1').addNumberOption(option =>
    option.setName('num1').setDescription('First number').setRequired(true)).addNumberOption(option =>
    option.setName('num2').setDescription('Second number').setRequired(true)),

  new SlashCommandBuilder().setName('multiply').setDescription('Multiplies two numbers').addNumberOption(option =>
    option.setName('num1').setDescription('First number').setRequired(true)).addNumberOption(option =>
    option.setName('num2').setDescription('Second number').setRequired(true)),

  new SlashCommandBuilder().setName('divide').setDescription('Divides num1 by num2').addNumberOption(option =>
    option.setName('num1').setDescription('First number').setRequired(true)).addNumberOption(option =>
    option.setName('num2').setDescription('Second number').setRequired(true)),

  new SlashCommandBuilder().setName('sqrt').setDescription('Calculates the square root of a number').addNumberOption(option =>
    option.setName('num').setDescription('Number').setRequired(true)),

  new SlashCommandBuilder().setName('power').setDescription('Raises num to the power of exp').addNumberOption(option =>
    option.setName('num').setDescription('Base number').setRequired(true)).addNumberOption(option =>
    option.setName('exp').setDescription('Exponent').setRequired(true)),

  new SlashCommandBuilder().setName('help').setDescription('Displays the help menu for commands')
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands.map(command => command.toJSON()) },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'help') {
    const helpEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Calculator Help')
      .setDescription('Here are the available commands:')
      .addFields(
        { name: '/add [num1] [num2]', value: 'Adds two numbers.' },
        { name: '/subtract [num1] [num2]', value: 'Subtracts num2 from num1.' },
        { name: '/multiply [num1] [num2]', value: 'Multiplies two numbers.' },
        { name: '/divide [num1] [num2]', value: 'Divides num1 by num2.' },
        { name: '/sqrt [num]', value: 'Calculates the square root of a number.' },
        { name: '/power [num] [exp]', value: 'Raises num to the power of exp.' },
      )
      .setFooter({ text: 'Use the /command to get results.' });

    await interaction.reply({ embeds: [helpEmbed] });
  }

  if (commandName === 'add') {
    const num1 = interaction.options.getNumber('num1');
    const num2 = interaction.options.getNumber('num2');
    const result = num1 + num2;

    const addEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Addition Result')
      .setDescription(`${num1} + ${num2} = ${result}`);

    await interaction.reply({ embeds: [addEmbed] });
  }

  if (commandName === 'subtract') {
    const num1 = interaction.options.getNumber('num1');
    const num2 = interaction.options.getNumber('num2');
    const result = num1 - num2;

    const subtractEmbed = new EmbedBuilder()
      .setColor('#FF5733')
      .setTitle('Subtraction Result')
      .setDescription(`${num1} - ${num2} = ${result}`);

    await interaction.reply({ embeds: [subtractEmbed] });
  }

  if (commandName === 'multiply') {
    const num1 = interaction.options.getNumber('num1');
    const num2 = interaction.options.getNumber('num2');
    const result = num1 * num2;

    const multiplyEmbed = new EmbedBuilder()
      .setColor('#FF6F61')
      .setTitle('Multiplication Result')
      .setDescription(`${num1} * ${num2} = ${result}`);

    await interaction.reply({ embeds: [multiplyEmbed] });
  }

  if (commandName === 'divide') {
    const num1 = interaction.options.getNumber('num1');
    const num2 = interaction.options.getNumber('num2');

    if (num2 === 0) {
      return interaction.reply('Cannot divide by zero.');
    }

    const result = num1 / num2;

    const divideEmbed = new EmbedBuilder()
      .setColor('#33A1FD')
      .setTitle('Division Result')
      .setDescription(`${num1} ÷ ${num2} = ${result}`);

    await interaction.reply({ embeds: [divideEmbed] });
  }

  if (commandName === 'sqrt') {
    const num = interaction.options.getNumber('num');
    const result = Math.sqrt(num);

    const sqrtEmbed = new EmbedBuilder()
      .setColor('#8E44AD')
      .setTitle('Square Root Result')
      .setDescription(`√${num} = ${result}`);

    await interaction.reply({ embeds: [sqrtEmbed] });
  }

  if (commandName === 'power') {
    const num = interaction.options.getNumber('num');
    const exp = interaction.options.getNumber('exp');
    const result = Math.pow(num, exp);

    const powerEmbed = new EmbedBuilder()
      .setColor('#F39C12')
      .setTitle('Power Result')
      .setDescription(`${num} ^ ${exp} = ${result}`);

    await interaction.reply({ embeds: [powerEmbed] });
  }
});

client.login(token);
