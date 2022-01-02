<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as Meyda from 'meyda';

	import { fragmentShader, vertexShader } from './orbShader';
	import {
		audioElement as audioElementStore,
		currentTime,
		currentTrack,
		paused,
		volume
	} from './audioPlayerStore';

	let canvasContainer: HTMLCanvasElement;
	let audioElement: HTMLAudioElement;

	const uniforms: Record<string, any> = {
		uFrequency: { value: 1 },
		uAmplitude: { value: 4 },
		uDensity: { value: 1 },
		uStrength: { value: 0.8 },
		uDeepPurple: { value: 0.74 },
		uOpacity: { value: 0.73 },
		uBrightness: {
			value: { x: 0.1, y: 0.15000000000000002, z: -0.44000000000000006 }
		},
		uContrast: { value: { x: 0.3, y: 0.3, z: 0.3 } },
		uOscilation: { value: { x: 0.45, y: 0.5, z: 0.9 } },
		uPhase: { value: { x: 0.31000000000000005, y: -0.68, z: 0.8 } }
	};

	onMount(() => {
		audioElementStore.set(audioElement);

		function createScene() {
			// Scene
			const scene = new THREE.Scene();

			/**
			 * Orb
			 */
			const orbGeometry = new THREE.IcosahedronGeometry(1, 10);

			const orbMaterial = new THREE.ShaderMaterial({
				wireframe: true,
				// blending: THREE.AdditiveBlending,
				transparent: true,
				vertexShader,
				fragmentShader,
				uniforms
			});

			const orbMesh = new THREE.Mesh(orbGeometry, orbMaterial);

			scene.add(orbMesh);

			/**
			 * Sizes
			 */
			const sizes = {
				width: 300,
				height: 270
			};

			/**
			 * Camera
			 */
			// Base camera
			const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
			camera.position.z = 2;
			scene.add(camera);

			/**
			 * Renderer
			 */
			const renderer = new THREE.WebGLRenderer({
				canvas: canvasContainer,
				alpha: true
			});
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

			/**
			 * Animate
			 */
			const tick = () => {
				orbGeometry.rotateY(0.005);
				// Render
				renderer.render(scene, camera);
				requestAnimationFrame(tick);
			};
			tick();
		}

		function createVisualizer() {
			const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
			const audioContext = new AudioContext();

			audioElement.crossOrigin = 'anonymous';

			const src = audioContext.createMediaElementSource(audioElement);
			const analyser = audioContext.createAnalyser();

			src.connect(analyser);
			analyser.connect(audioContext.destination);
			analyser.fftSize = 256;

			function bound(_number: number, _min: number, _max: number) {
				return Math.max(Math.min(_number, _max), _min);
			}

			// Create the Meyda Analyzer
			// TODO: I have no idea why typings for createMeydaAnalyzer is not working...
			const analyzer = Meyda.createMeydaAnalyzer({
				// Pass in the AudioContext so that Meyda knows which AudioContext Box to work with
				audioContext: audioContext,
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
				featureExtractors: ['rms', 'energy'],
				// Finally, we provide a function which Meyda will call every time it
				// calculates a new level. This function will be called around 86 times per
				// second.
				callback: (features) => {
					uniforms.uStrength.value = bound(features.rms as number, 0, 10) * 2;
					uniforms.uDensity.value = bound(features.energy as number, 0, 2) * 2;
				}
			});

			analyzer.start();
		}

		createScene();
		createVisualizer();
	});
</script>

<audio
	bind:this={audioElement}
	bind:paused={$paused}
	bind:volume={$volume}
	bind:currentTime={$currentTime}
	crossOrigin="anonymous"
	src={$currentTrack.url}
/>

<canvas bind:this={canvasContainer} class="orb" />
