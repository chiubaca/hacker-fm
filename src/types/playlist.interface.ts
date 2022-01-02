export interface Artwork {
  "150x150": string;
  "480x480": string;
  "1000x1000": string;
}

export interface RemixOf {
  tracks?: any;
}

export interface CoverPhoto {
  "640x": string;
  "2000x": string;
}

export interface ProfilePicture {
  "150x150": string;
  "480x480": string;
  "1000x1000": string;
}

export interface User {
  album_count: number;
  bio: string;
  cover_photo: CoverPhoto;
  followee_count: number;
  follower_count: number;
  handle: string;
  id: string;
  is_verified: boolean;
  location: string;
  name: string;
  playlist_count: number;
  profile_picture: ProfilePicture;
  repost_count: number;
  track_count: number;
}

export interface Track {
  artwork: Artwork;
  description: string;
  genre: string;
  id: string;
  mood: string;
  release_date: string;
  remix_of: RemixOf;
  repost_count: number;
  favorite_count: number;
  tags: string;
  title: string;
  user: User;
  duration: number;
  downloadable: boolean;
  play_count: number;
  permalink: string;
}

export type Playlist = Track[];
