<script lang="ts">
	import Typewriter from 'svelte-typewriter';
</script>

<div class="terminal">
	<div class="crt-overlay-effect" />
	<Typewriter cascade interval={10} cursor="green">
		<p>Initialising boot sequence...</p>
		<p>Installing synthy_vibes.exe</p>
		<p>Done!</p>
	</Typewriter>

	<Typewriter delay={1000} interval={1} cursor="green">
		<pre>::::::::::::::::::::::::::::::::::
      
    
      ██   ██  █████   ██████ ██   ██ ███████ ██████     ███████ ███    ███
      ██   ██ ██   ██ ██      ██  ██  ██      ██   ██    ██      ████  ████
      ███████ ███████ ██      █████   █████   ██████     █████   ██ ████ ██
      ██   ██ ██   ██ ██      ██  ██  ██      ██   ██    ██      ██  ██  ██
      ██   ██ ██   ██  ██████ ██   ██ ███████ ██   ██ ██ ██      ██      ██


::::::::::::::::::::::::::::::::::</pre>
	</Typewriter>

	<Typewriter delay={4000} interval={10} cursor="green">
		<p>Press any key to continue...</p>
	</Typewriter>
</div>

<style scoped>
	.terminal {
		color: green;
		background-color: #a4508b;
		background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
		color: white;
		white-space: pre-wrap;
		height: 100vh;
		font-size: clamp(0.4rem, 1vw, 1rem);
	}

	pre {
		margin: 0;
	}
</style>
