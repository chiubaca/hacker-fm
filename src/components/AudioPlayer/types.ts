export interface Song {
	index: number;
	url: string;
	name: string;
}

export interface ParsedPlaylist {
	index: number;
	name: string;
	artist: string;
	url: string;
	permaLink: string;
}
