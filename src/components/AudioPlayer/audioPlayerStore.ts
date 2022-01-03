import { Playlist } from '$types';
import { writable } from 'svelte/store';

import playlist from '../../../static/playlist.json';
import { ParsedPlaylist } from './types';

export const audioElement = writable<HTMLAudioElement>();

export const paused = writable<boolean>(true);
export const volume = writable<number>(0.5);
export const currentTime = writable<number>(0);
export const duration = writable<number>(0);

export const ended = writable<boolean>(false);

// this sucks
const parsedData = JSON.parse(playlist as unknown as string) as unknown as Playlist;
const PLAYLIST = parsedData.map((track, index) => ({
	index,
	name: track.title,
	artist: track.user.name,
	// TODO: need to check for available host up front.
	url: `https://discoveryprovider.audius4.prod-us-west-2.staked.cloud/v1/tracks/${track.id}/stream?app_name=HACKERFM`,
	permaLink: track.permalink
}));

export const currentTrack = writable<ParsedPlaylist>(PLAYLIST[0]);

export function setNextTrack(): void {
	currentTrack.update((track) => {
		if (track.index === PLAYLIST.length - 1) {
			return PLAYLIST[0];
		}

		return PLAYLIST[track.index + 1];
	});
}

export function setPreviousTrack(): void {
	currentTrack.update((track) => {
		if (track.index === 0) {
			return PLAYLIST[PLAYLIST.length - 1];
		}

		return PLAYLIST[track.index - 1];
	});
}

// this auto plays the next track
ended.subscribe(async (trackEnded) => {
	if (trackEnded) {
		paused.set(true);
		await setNextTrack();
		currentTime.set(0);
		paused.set(false);
	}
});
