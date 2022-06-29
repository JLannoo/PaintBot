export const colorMaps: { [key: string]: string } = {
	'red': '#ff0000',
	'orange': '#ffa500',
	'yellow': '#ffff00',
	'green': '#00ff00',
	'blue': '#0000ff',
	'purple': '#800080',
	'pink': '#ffc0cb',
	'white': '#ffffff',
	'black': '#000000',
	'gray': '#808080',
	'brown': '#a52a2a',
};

/**
 * Parses color to hexadecimal
 * @param {string} color Color to convert to hex
 * @return {string} Hexadecimal representation of color
 */
export function parse(color: string): string {
	if (colorMaps[color]) {
		return colorMaps[color];
	}

	return color;
}
