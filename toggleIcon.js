const browserScheme = window.matchMedia("(prefers-color-scheme: dark)");

browserScheme.addEventListener("change", () => {
	chrome.runtime.sendMessage( { scheme: browserScheme.matches ? "dark" : "light" }, function(response) {
		console.log(response.farewell);
	});
});
