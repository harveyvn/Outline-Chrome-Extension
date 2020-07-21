// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const mode = window.matchMedia("(prefers-color-scheme: dark)");
console.log(mode);

chrome.browserAction.onClicked.addListener(function(tab) {
	var tabUrl = tab.url;
	var outlineUrl = 'http://outline.com/' + tabUrl;
	window.open(outlineUrl);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.scheme == "dark") {
		chrome.browserAction.setIcon({
			path: {
				"16": "images/dark.png",
				"32": "images/dark.png",
				"48": "images/dark.png"
			}
		});
	} else {
		chrome.browserAction.setIcon({
			path: {
				"16": "images/light.png",
				"32": "images/light.png",
				"48": "images/light.png"
			}
		});
	}
	sendResponse({farewell: ""});
});