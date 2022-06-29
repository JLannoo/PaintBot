import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { getImage } from '../service/canvas';

export = {
	data:
		new SlashCommandBuilder()
			.setName('view')
			.setDescription('Show the current canvas!'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply({ content: 'It currently looks like this:', files: [{ attachment: await getImage() }] });
	},
};
