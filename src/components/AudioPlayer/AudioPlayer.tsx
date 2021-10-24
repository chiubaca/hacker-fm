import { useState, useEffect, useRef } from "react";
import AudioPlayerManager from "./AudioPlayerManager";

const playList = [
  {
    url: "https://discoveryprovider.audius4.prod-us-west-2.staked.cloud/v1/tracks/D7KyD/stream?app_name=EXAMPLEAPP",
    name: "vapour1 ",
  },
  {
    url: "https://discoveryprovider.audius4.prod-us-west-2.staked.cloud/v1/tracks/D7KyD/stream?app_name=EXAMPLEAPP",
    name: "vapour2 ",
  },
  {
    url: "https://discoveryprovider.audius4.prod-us-west-2.staked.cloud/v1/tracks/D7KyD/stream?app_name=EXAMPLEAPP",
    name: "vapour3 ",
  },
];

export function AudioPlayer() {
  const canvasContainer = useRef<HTMLCanvasElement>(null!);
  const audioElement = useRef<HTMLAudioElement>(null!);

  const AudioPlayerRef = useRef<AudioPlayerManager>(null!);

  const [selectedTrack, setSelectedTrack] = useState<{
    url: string;
    name: string;
  }>(playList[0]);

  useEffect(() => {
    AudioPlayerRef.current = new AudioPlayerManager(
      canvasContainer.current,
      ".audioPlayer",
      playList,
      audioElement.current
    );
  }, []);

  return (
    <div>
      my awesome component
      <div>Selected track is: {selectedTrack.name}</div>
      <canvas ref={canvasContainer} className="webgl"></canvas>
      <div className="playerElem">
        <audio
          crossOrigin="anonymous"
          controls
          ref={audioElement}
          src={selectedTrack.url}
        ></audio>
        {playList.map((track, index) => (
          <button
            key={index}
            onClick={(e) => {
              setSelectedTrack(track);
              // AudioPlayerRef.current.play();
              AudioPlayerRef.current.startAudio();
            }}
          >
            {track.name}
          </button>
        ))}
      </div>
    </div>
  );
}
