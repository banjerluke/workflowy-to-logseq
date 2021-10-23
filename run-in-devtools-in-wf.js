(async function() {
	var resultIdMap = new Map();
	var mirrors = new Map();

	var processNode = (node) => {
		let result = {};
		if (!resultIdMap.get(node.id)) resultIdMap.set(node.id, result);
		result.name = node.name;
		result.id = node.id;
		if (node.note) result.note = node.note;
		if (node.completed) result.completed = node.completed;
		result.lastModified = node.lastModified;
		node.mirrorRootItems?.forEach(item => mirrors.set(item.id, node.id));
		if (node.children) result.children = node.children?.map(child => processNode(child));
		return result;
	}

	var results = processNode(WF.currentItem().data).children;

	mirrors.forEach((rootId, mirrorId) => {
		let mirroredItem = resultIdMap.get(mirrorId);
		console.log(mirroredItem);
		if (mirroredItem) mirroredItem.mirrorRoot = { ...resultIdMap.get(rootId), children: undefined };
		delete mirroredItem.children;
	});

	await new Promise((resolve, reject) => {
		const tdScript = document.createElement('script');
		tdScript.src = 'https://unpkg.com/turndown/dist/turndown.js';
		tdScript.async = true;
		tdScript.onload = resolve;
		tdScript.onerror = reject;
		document.body.appendChild(tdScript);
	});

	td = new TurndownService();
	// TODO: handle conversion of WF HTML to Markdown
	// TODO: change mirrored nodes to {{embed ((nodeId))}}
	// TODO: change links to other nodes to ((blockRefs)) although we lose link text...
	// TODO: split children of root node into separate md files?
	// TODO: download exported data as files in browser

	// TODO: Don't copy data until transformations are complete
	copy(JSON.stringify(results, null, 2));
	console.log('Copied to clipboard:', results);
})();

