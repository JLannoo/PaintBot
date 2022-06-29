import client from './config/Client';
import commands from './config/Commands';

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing that command.', ephemeral: true });
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
