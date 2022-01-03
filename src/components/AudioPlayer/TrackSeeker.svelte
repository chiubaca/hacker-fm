<script lang="ts">
	import { paused, currentTime, duration } from './audioPlayerStore';

	import { secondsToMinsAndSecs } from '$lib/secondsToMinsAndSecs';

	let wasPlaying: boolean = false;
	function ponterDown() {
		// To handle seeking, the track must be paused first. But if the track is
		// being played, we want to make sure we resume it.

		//TODO: Perhaps there is a better way...
		if (!$paused) {
			wasPlaying = true;
			paused.set(true);
		} else {
			wasPlaying = false;
		}
	}

	function pointerUp(e) {
		if (wasPlaying) {
			paused.set(false);
		}
	}

	const rangeChange = (e) => {
		currentTime.update(() => e.target.value);
	};
</script>

<div class="seeker">
	<input
		class="slider"
		type="range"
		step="0.1"
		min="0"
		max={$duration}
		bind:value={$currentTime}
		on:pointerdown={ponterDown}
		on:pointerup={pointerUp}
		on:change={rangeChange}
	/>

	<div>{secondsToMinsAndSecs($currentTime)}/{secondsToMinsAndSecs($duration)}</div>
</div>

<style scoped>
	.seeker {
		color: green;
		display: flex;
	}

	.slider {
		appearance: none;
		width: 50%;
		height: 3px;
		background: green;
		/* outline: none; */
		opacity: 0.7;
		/* transition: opacity 0.2s; */
		margin: 10px;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 15px;
		height: 15px;
		background: #04aa6d;
		border-radius: 10px;
		cursor: pointer;
	}

	/* All the same stuff for Firefox */
	input[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 15px;
		height: 15px;
		background: #04aa6d;
		border-radius: 10px;
		cursor: pointer;
	}
</style>
