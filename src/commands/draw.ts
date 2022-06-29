import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import { writePixel, getImage } from '../service/canvas';
import { parse, colorMaps } from '../service/colorParser';

import dotenv from 'dotenv';
dotenv.config();

export = {
	data:
		new SlashCommandBuilder()
			.setName('draw')
			.setDescription('Draw a pixel in the canvas!')
			.addNumberOption((option) => option
				.setName('x')
				.setDescription('The x coordinate of the pixel to draw')
				.setRequired(true),
			)
			.addNumberOption((option) => option
				.setName('y')
				.setDescription('The y coordinate of the pixel to draw')
				.setRequired(true),
			)
			.addStringOption((option) => option
				.setName('color')
				.setDescription('The color of the pixel to draw (in hexadecimal)')
				.setRequired(true)
				.addChoices(...Object.keys(colorMaps).map((key) =>
					({
						name: key,
						value: colorMaps[key],
					}),
				),
				),
			),
	async execute(interaction: CommandInteraction) {
		const x = interaction.options.get('x')?.value;
		const y = interaction.options.get('y')?.value;
		const color = interaction.options.get('color')?.value;

		await writePixel(Number(x), Number(y), parse(color as string));

		await interaction.reply({ content: `Drawn pixel at (${x}, ${y}) with color ${color}`, files: [{ attachment: await getImage() }] });
	},
};
