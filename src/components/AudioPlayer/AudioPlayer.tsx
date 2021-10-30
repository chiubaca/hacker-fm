import { useState, useEffect, useRef } from "react";

import AudioPlayerManager, { Song } from "./AudioPlayerManager";
import playlist from "../../../public/playlist.json";
import { Playlist } from "../../../types/playlist.interface";
import "./styles.css";

const parsedData = JSON.parse(playlist) as unknown as Playlist;

const PLAYLIST = parsedData.map((track, index) => {
  return {
    index,
    name: track.title,
    url: `https://discoveryprovider.audius4.prod-us-west-2.staked.cloud/v1/tracks/${track.id}/stream?app_name=HACKERFM`,
  };
});

export function AudioPlayer() {
  const canvasContainer = useRef<HTMLCanvasElement>(null!);
  const audioElement = useRef<HTMLAudioElement>(null!);
  const AudioPlayerRef = useRef<AudioPlayerManager>(null!);

  const [selectedTrack, setSelectedTrack] = useState<Song>(PLAYLIST[0]);

  useEffect(() => {
    AudioPlayerRef.current = new AudioPlayerManager(
      canvasContainer.current,
      audioElement.current,
      PLAYLIST
    );
    AudioPlayerRef.current.playTrack();
  }, []);

  const playNextTrackHandler = () => {
    if (selectedTrack.index === PLAYLIST.length - 1) {
      AudioPlayerRef.current.changeTrack(PLAYLIST[0]);
      setSelectedTrack(PLAYLIST[0]);
    } else {
      //decrement track
      let incrementTrack = PLAYLIST[selectedTrack.index + 1];
      AudioPlayerRef.current.changeTrack(incrementTrack);
      setSelectedTrack(incrementTrack);
    }
  };

  const playPreviousTrackHandler = () => {
    if (selectedTrack.index === 0) {
      // loop to back of the list
      let decrementTrack = PLAYLIST[PLAYLIST.length - 1];
      AudioPlayerRef.current.changeTrack(decrementTrack);
      setSelectedTrack(decrementTrack);
    } else {
      //decrement track
      let decrementTrack = PLAYLIST[selectedTrack.index - 1];
      AudioPlayerRef.current.changeTrack(decrementTrack);
      setSelectedTrack(decrementTrack);
    }
  };

  return (
    <div>
      <audio
        crossOrigin="anonymous"
        webkit-playsinline="true"
        playsinline="true"
        controls
        ref={audioElement}
        src={PLAYLIST[0].url}
        onEnded={playNextTrackHandler}
      ></audio>

      <div>Selected track is: {selectedTrack.name}</div>

      <div className="audio-player">
        <canvas ref={canvasContainer} className="orb"></canvas>

        <div className="tracks">
          {PLAYLIST.map((track, index) => (
            <button
              key={index}
              onClick={(e) => {
                setSelectedTrack(track);
                AudioPlayerRef.current.changeTrack(track);
              }}
            >
              {track.name}
            </button>
          ))}
        </div>

        <div className="player-controls">
          <button onClick={playPreviousTrackHandler}>⏮️</button>

          <button onClick={() => AudioPlayerRef.current.playTrack()}>⏯</button>

          <button onClick={playNextTrackHandler}>⏭️</button>
        </div>
      </div>
    </div>
  );
}
