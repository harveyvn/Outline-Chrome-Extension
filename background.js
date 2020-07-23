// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var contextMenuItem = {
	"id": "outlineContextMenu",
	"title": "Go to Outline",
	"contexts": ["all"]
};

function goToOutline(tabUrl) {
	var outlineUrl = 'http://outline.com/' + tabUrl;
	window.open(outlineUrl);
}

function toggleIcon(scheme) {
	if (scheme == "dark") {
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
}

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create(contextMenuItem);
});

chrome.browserAction.onClicked.addListener(function(tab) {
	goToOutline(tab.url);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	toggleIcon(request.scheme);
	sendResponse({farewell: ""});
});

chrome.contextMenus.onClicked.addListener(function(tab) {
	goToOutline(tab.pageUrl);
});