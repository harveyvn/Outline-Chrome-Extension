// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
	var tabUrl = tab.url;
	var outlineUrl = 'http://outline.com/' + tabUrl;
	window.open(outlineUrl);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.scheme == "dark") {
		chrome.browserAction.setIcon({
			path: {
				"16": "images/icon.png",
				"32": "images/icon.png",
				"48": "images/icon.png"
			}
		});
	} else {
		chrome.browserAction.setIcon({
			path: {
				"16": "images/get_started16.png",
				"32": "images/get_started32.png",
				"48": "images/get_started48.png"
			}
		});
	}
	sendResponse({farewell: "background.js got a message"});
});