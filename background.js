// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const contextMenuItem = {
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

function onChangedSettings(request) {
	switch(request.command) {
		case "toggleIcon":
			toggleIcon(request.scheme);
			break;
		case "hideContextMenu":
			if (request.value) {
				chrome.contextMenus.remove("outlineContextMenu");
			} else {
				chrome.contextMenus.create(contextMenuItem);
			}
			break;
		default:
			console.log(request.command + " is undefined!");
	}
}

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create(contextMenuItem);
});

chrome.contextMenus.onClicked.addListener(function(tab) {
	goToOutline(tab.pageUrl);
});

chrome.browserAction.onClicked.addListener(function(tab) {
	goToOutline(tab.url);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	onChangedSettings(request);
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (var key in changes) {
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
								'Old value was "%s", new value is "%s".',
								key,
								namespace,
								storageChange.oldValue,
								storageChange.newValue);
	}
});