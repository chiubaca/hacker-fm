import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import { fragmentShader, vertexShader } from "./orbShader";

import * as Meyda from "meyda";

interface Song {
  url: string;
  name: string;
}

/**  @type {Record<string, any>}  */
const uniforms = {
  uFrequency: { value: 1 },
  uAmplitude: { value: 4 },
  uDensity: { value: 1 },
  uStrength: { value: 0.8 },
  uDeepPurple: { value: 0.74 },
  uOpacity: { value: 0.23 },
  uBrightness: {
    value: { x: 0.1, y: 0.15000000000000002, z: -0.44000000000000006 },
  },
  uContrast: { value: { x: 0.3, y: 0.3, z: 0.3 } },
  uOscilation: { value: { x: 0.45, y: 0.5, z: 0.9 } },
  uPhase: { value: { x: 0.31000000000000005, y: -0.68, z: 0.8 } },
};

export default class AudioPlayerManager {
  playerElem: any;
  audio: Song[];
  currentAudio: HTMLAnchorElement | undefined;
  audioElem: HTMLAudioElement;
  playListElem: HTMLDivElement | undefined;
  audioContext: AudioContext | undefined;
  canvas: HTMLElement;
  // audioContext: null;

  constructor(
    canvas: HTMLElement,
    selector: string,
    audio: Song[] = [],
    audioElem: HTMLAudioElement
  ) {
    this.playerElem = document.querySelector(selector);
    this.audio = audio;
    this.currentAudio = undefined;
    // this.createPlayerElements();
    this.audioContext = undefined;
    this.canvas = canvas;
    this.audioElem = audioElem;

    this.audioEventHandler();
    this.createScene();
  }
  audioEventHandler() {
    this.audioElem.addEventListener("play", () => {
      console.log("play...");
      this.startAudio();
    });
  }
  startAudio() {
    console.log("start audio");
    this.audioElem.play();
    this.createVisualizer();
  }
  createScene() {
    // Scene
    const scene = new THREE.Scene();

    /**
     * Orb
     */

    const orbGeometry = new THREE.IcosahedronGeometry(1, 128);

    const orbMaterial = new THREE.ShaderMaterial({
      wireframe: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const orbMesh = new THREE.Mesh(orbGeometry, orbMaterial);

    scene.add(orbMesh);

    /**
     * Sizes
     */
    const sizes = {
      width: 300,
      height: 300,
    };

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 3;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, this.canvas);
    controls.enableDamping = true;
    controls.autoRotate = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestAnimationFrame(tick);
    };

    tick();
  }

  createVisualizer() {
    if (!this.audioElem) {
      return;
    }
    // this.audioElem.play();

    this.audioContext = new AudioContext();

    this.audioElem.crossOrigin = "anonymous";

    const src = this.audioContext.createMediaElementSource(this.audioElem);
    const analyser = this.audioContext.createAnalyser();

    src.connect(analyser);
    analyser.connect(this.audioContext.destination);
    analyser.fftSize = 256 * 4;

    const bufferLength = analyser.frequencyBinCount;

    function bound(_number: number, _min: number, _max: number) {
      return Math.max(Math.min(_number, _max), _min);
    }

    // Create the Meyda Analyzer
    const analyzer = Meyda.createMeydaAnalyzer({
      // Pass in the AudioContext so that Meyda knows which AudioContext Box to work with
      audioContext: this.audioContext,
      // Source is the audio node that is playing your audio. It could be any node,
      // but in this case, it's the MediaElementSourceNode corresponding to your
      // HTML 5 Audio Element with your audio in it.
      source: src,
      // Buffer Size tells Meyda how often to check the audio feature, and is
      // measured in Audio Samples. Usually there are 44100 Audio Samples in 1
      // second, which means in this case Meyda will calculate the level about 86
      // (44100/512) times per second.
      bufferSize: 512,
      // Here we're telling Meyda which audio features to calculate. While Meyda can
      // calculate a variety of audio features, in this case we only want to know
      // the "rms" (root mean square) of the audio signal, which corresponds to its
      // level
      featureExtractors: ["rms", "energy"],
      // Finally, we provide a function which Meyda will call every time it
      // calculates a new level. This function will be called around 86 times per
      // second.
      callback: (features) => {
        console.log(
          "Meyda",
          features.rms,
          bound(features.energy as number, 0, 10)
        );
        uniforms.uStrength.value = bound(features.rms as number, 0, 10) * 2;
        uniforms.uDensity.value = bound(features.energy as number, 0, 2) * 2;
      },
    });

    analyzer.start();
  }

  createPlayerElements() {
    this.audioElem = document.createElement("audio");
    const playListElem = document.createElement("div");

    this.playerElem.appendChild(this.audioElem);
    this.playerElem.appendChild(playListElem);
    this.createPlayListElements(playListElem);
  }

  createPlayListElements(playListElem: HTMLDivElement) {
    this.audio.forEach((audio) => {
      const audioItem = document.createElement("a");
      audioItem.href = audio.url;
      audioItem.innerHTML = `${audio.name}`;

      this.setupEventListeners(audioItem);
      playListElem.appendChild(audioItem);
    });
  }

  setupEventListeners(audioItem: HTMLAnchorElement) {
    audioItem.addEventListener("click", (e) => {
      e.preventDefault();

      if (!this.audioContext) {
        console.log("test leggo");
        this.createVisualizer();
      }

      const isCurrentAudio =
        audioItem.getAttribute("href") ===
        (this.currentAudio && this.currentAudio.getAttribute("href"));

      if (isCurrentAudio && !this.audioElem!.paused) {
        // this.setPlayIcon(this.currentAudio);
        this.audioElem!.pause();
      } else if (isCurrentAudio && this.audioElem!.paused) {
        // this.setPauseIcon(this.currentAudio);
        this.audioElem!.play();
      } else {
        this.currentAudio = audioItem;
        // this.setPauseIcon(this.currentAudio);

        if (!this.audioElem) {
          return;
        }

        this.audioElem.src = this.currentAudio.getAttribute("href") || "";
        this.audioElem!.play();
      }
    });
  }
  setPauseIcon(currentAudioElement: HTMLAnchorElement | undefined) {
    if (!currentAudioElement) {
      return;
    }
    const icon = currentAudioElement.querySelector("i");
    icon!.classList.remove("fa-pause");
    icon!.classList.add("fa-play");
  }
  setPlayIcon(currentAudioElement: HTMLAnchorElement | undefined) {
    if (!currentAudioElement) {
      return;
    }
    const icon = currentAudioElement.querySelector("i");
    icon!.classList.remove("fa-pause");
    icon!.classList.add("fa-play");
  }
}
