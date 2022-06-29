import { Canvas, createCanvas } from 'canvas';
import { Pixel } from '../types';

import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config();

const CANVAS_SIZE = Number(process.env.CANVAS_SIZE) || 500;
const CANVAS_PIXELS = Number(process.env.CANVAS_PIXELS) || 500;
const PIXEL_SIZE = CANVAS_SIZE / CANVAS_PIXELS;

/**
 *
 * @param {Canvas} canvas Current canvas
 * @param {Pixel[]} pixels Pixel array to draw
 * @return {Promise<Canvas>}
 */
async function drawPixels(canvas: Canvas, pixels: Pixel[]): Promise<Canvas> {
	const ctx = canvas.getContext('2d');

	for (let i = 0; i < pixels.length; i++) {
		const pixel = pixels[i];
		ctx.fillStyle = `${pixel.color}`;
		ctx.fillRect(pixel.x*PIXEL_SIZE, pixel.y*PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
	}

	return canvas;
}

/**
 * Outputs the current canvas to a file in /src/storage
 * @param {string} filename The filename to output to. Defaults to 'canvas.png'
 */
export async function outputPng(filename: string='canvas.png') {
	const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);

	const pixels:Pixel[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'storage', 'pixels.json'), 'utf8')).pixels;

	await drawPixels(canvas, pixels);

	const pngStream = canvas.createPNGStream();
	const out = fs.createWriteStream(path.join(__dirname, '..', 'storage', filename));

	pngStream.pipe(out);
	out.on('finish', () => console.log('Finished writing canvas to storage.'));
}

/**
 * Writes a pixel to the json file
 * @param {number} x X coordinate of the pixel to be written
 * @param {number} y Y coordinate of the pixel to be written
 * @param {string} color color of the pixel to be written
 */
export async function writePixel(x: number, y: number, color: string) {
	const pixels = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'storage', 'pixels.json'), 'utf8'));
	pixels.pixels.push({ x, y, color });
	fs.writeFileSync(path.join(__dirname, '..', 'storage', 'pixels.json'), JSON.stringify(pixels));
}

/**
 * Return the current canvas
 * @return {Buffer} Canvas as a buffer
 */
export async function getImage() {
	const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);

	const pixels:Pixel[] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'storage', 'pixels.json'), 'utf8')).pixels;

	await drawPixels(canvas, pixels);

	const buffer = canvas.toBuffer();

	return buffer;
}

/**
 * Clears the canvas
 */
export async function clear() {
	const object = {
		pixels: [],
	};
	fs.writeFileSync(path.join(__dirname, '..', 'storage', 'pixels.json'), JSON.stringify(object));
}
