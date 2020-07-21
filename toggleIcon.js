const mql = window.matchMedia("(prefers-color-scheme: dark)");

mql.addEventListener("change", () => {
	chrome.runtime.sendMessage( { scheme: mql.matches ? "dark" : "light" }, function(response) {
		console.log(response.farewell);
	});
});

