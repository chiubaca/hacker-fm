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
		<pre class="clamp-text ascii-art">

ＷＥＬＣＯＭＥ ＴＯ

888    888        d8888  .d8888b.  888    d8P  8888888888 8888888b.      8888888888 888b     d888 
888    888       d88888 d88P  Y88b 888   d8P   888        888   Y88b     888        8888b   d8888 
888    888      d88P888 888    888 888  d8P    888        888    888     888        88888b.d88888 
8888888888     d88P 888 888        888d88K     8888888    888   d88P     8888888    888Y88888P888 
888    888    d88P  888 888        8888888b    888        8888888P"      888        888 Y888P 888 
888    888   d88P   888 888    888 888  Y88b   888        888 T88b       888        888  Y8P  888 
888    888  d8888888888 Y88b  d88P 888   Y88b  888        888  T88b  d8b 888        888   "   888 
888    888 d88P     888  "Y8888P"  888    Y88b 8888888888 888   T88b Y8P 888        888       888
	</pre>
	</Typewriter>

	<Typewriter delay={7000} interval={50} cursor="green">
		<p>Press any key to continue...</p>
	</Typewriter>
</div>

<style scoped>
	.terminal {
		font-family: monospace;
		color: green;
		background-color: #a4508b;
		background-image: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
		color: white;
		height: 100vh;
	}

	.ascii-art {
		padding: 5rem 0;
	}
	.clamp-text {
		font-size: clamp(0.5rem, 1vw, 1rem);
	}
	pre {
		margin: 0;
	}
</style>
