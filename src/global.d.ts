/// <reference types="@sveltejs/kit" />

declare global {
	interface Window {
		HAS_INTERACTED: boolean;
	}
}

export type fixAny = any;
