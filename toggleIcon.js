const browserScheme = window.matchMedia("(prefers-color-scheme: dark)");

browserScheme.addEventListener("change", () => {
	chrome.runtime.sendMessage({
		command: "toggleIcon",
		scheme: browserScheme.matches ? "dark" : "light" 
	});
});
