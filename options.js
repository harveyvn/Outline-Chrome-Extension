// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.storage.local.get(['hideContextMenu'], function(result) {
	document.getElementById("contextMenu").checked = result.hideContextMenu;
});


let contextMenu = document.getElementById("contextMenu");

contextMenu.addEventListener('click', function() {
	chrome.storage.local.set({hideContextMenu: contextMenu.checked}, function() {
		// console.log('Value is set to ' + contextMenu.checked);
	});


	chrome.runtime.sendMessage({
		command: "hideContextMenu",
		value: contextMenu.checked
	});
});