import { writable } from 'svelte/store';
import { io, type Socket } from 'socket.io-client';

// create a writable store that holds the socket
export const socket = writable<Socket | null>(null);

// only run on the client (not during SSR)
if (typeof window !== 'undefined') {
	const curSocket = io('https://word-game-socket-backend-702763400167.asia-south1.run.app');

	curSocket.on('connect', () => {
		console.log('Connected');
		socket.set(curSocket);
	});

	curSocket.on('disconnect', () => {
		console.log('Disconnected');
		socket.set(null);
	});
}