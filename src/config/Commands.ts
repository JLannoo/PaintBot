import fs from 'node:fs';
import path from 'node:path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import dotenv from 'dotenv';
import { Collection } from 'discord.js';
dotenv.config();

const TOKEN = process.env.DISCORD_BOT_TOKEN as string;
const CLIENT_ID = process.env.DISCORD_APP_ID as string;

console.log('Setting commands...');

const commands = new Collection<unknown, any>();
const commandsPath = path.join(__dirname, '..', 'commands');

const fileExtension = process.env.NODE_ENV === 'production' ? '.js' : '.ts';
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(fileExtension));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.set(command.data.name, command);
}

const rest = new REST({ version: '10' }).setToken(TOKEN);
const jsonCommands = commands.map((command) => command.data.toJSON());

rest.put(Routes.applicationCommands(CLIENT_ID), { body: jsonCommands })
	.then(() => {
		console.log('Successfully registered application commands.');
		console.log('Registered commands:', commands.map((command) => command.data.name));
	})
	.catch(console.error);

export default commands;
