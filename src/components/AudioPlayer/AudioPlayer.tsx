/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';

import AudioPlayerManager, { Song } from './AudioPlayerManager';
import playlist from '../../../public/playlist.json';
import { Playlist } from '../../../types/playlist.interface';
import isSafariBrowser from '../../helpers/detectSafari';
import './styles.css';

const parsedData = JSON.parse(playlist) as unknown as Playlist;

const PLAYLIST = parsedData.map((track, index) => ({
  index,
  name: track.title,
  artist: track.user.name,
  // TODO: need to check for available host up front.
  url: `https://discoveryprovider.audius4.prod-us-west-2.staked.cloud/v1/tracks/${track.id}/stream?app_name=HACKERFM`,
  permaLink: track.permalink,
}));

const AudioPlayer = function () {
  const canvasContainer = useRef<HTMLCanvasElement>(null!);
  const audioElement = useRef<HTMLAudioElement>(null!);
  const AudioPlayerRef = useRef<AudioPlayerManager>(null!);

  const [selectedTrack, setSelectedTrack] = useState<Song>(PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    AudioPlayerRef.current = new AudioPlayerManager(
      canvasContainer.current,
      audioElement.current,
      PLAYLIST,
    );

    if (window.HAS_INTERACTED && !isSafariBrowser()) {
      AudioPlayerRef.current.playTrack();
      setIsPlaying(true);
    }
  }, []);

  const playSongHandler = () => {
    AudioPlayerRef.current.playTrack();
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const playNextTrackHandler = () => {
    if (selectedTrack.index === PLAYLIST.length - 1) {
      AudioPlayerRef.current.changeTrack(PLAYLIST[0]);
      setSelectedTrack(PLAYLIST[0]);
    } else {
      // decrement track
      const incrementTrack = PLAYLIST[selectedTrack.index + 1];
      AudioPlayerRef.current.changeTrack(incrementTrack);
      setSelectedTrack(incrementTrack);
    }
  };

  const playPreviousTrackHandler = () => {
    if (selectedTrack.index === 0) {
      // loop to back of the list
      const decrementTrack = PLAYLIST[PLAYLIST.length - 1];
      AudioPlayerRef.current.changeTrack(decrementTrack);
      setSelectedTrack(decrementTrack);
    } else {
      // decrement track
      const decrementTrack = PLAYLIST[selectedTrack.index - 1];
      AudioPlayerRef.current.changeTrack(decrementTrack);
      setSelectedTrack(decrementTrack);
    }
  };

  const openSongPermalinkHandler = () => {
    window.open(
      `https://audius.co${selectedTrack.permaLink}`,
      'newwindow',
      'width=800, height=800',
    );
  };

  return (
    <div>
      <audio
        crossOrigin="anonymous"
        ref={audioElement}
        src={PLAYLIST[0].url}
        onEnded={playNextTrackHandler}
      />
      <track kind="captions" />

      <div className="audio-player">
        <div className="now-playing">
          <span className="cursor">
            {' '}
            {'>'}
            {' '}
          </span>
          <button type="button" href="#" onClick={openSongPermalinkHandler}>
            <span className="song">{selectedTrack.name}</span>
            <span className="artist">
              -
              {selectedTrack.artist}
            </span>
          </button>
        </div>
        <canvas ref={canvasContainer} className="orb" />

        <div className="player-controls">
          <button
            type="button"
            className="player-controls__button"
            onClick={playPreviousTrackHandler}
          >
            <svg viewBox="0 0 512 512">
              <path
                d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button type="button" className="player-controls__button" onClick={playSongHandler}>
            {isPlaying ? (
              <svg viewBox="0 0 512 512">
                <path
                  d="M199.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z"
                  fill="currentColor"
                />
                <path
                  d="M375.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 512 512">
                <path
                  d="M190.06 414l163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="player-controls__button"
            onClick={playNextTrackHandler}
          >
            <svg viewBox="0 0 512 512">
              <path
                d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
