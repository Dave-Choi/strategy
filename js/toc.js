function dasherize(str){
	return str.toLowerCase().split(" ").join("-");
}

function headerLevel(headerNode){
	// Extract the number, as a number, from h1, h2, h3, h4, h5, or h6 tag
	var headerRE = /h(\d)/i;
	return parseInt(headerRE.exec(headerNode.tagName)[1], 10) || 0;
}

function last(array){
	var len = array.length;
	return array[len-1];
}

$(document).ready(function(){
	/*
		This creates a hierarchy of unordered lists by iterating over header elements.

		Each header number is compared to the previous node's header number:
			If greater, it creates a child list.
			If equal, it's a sibling
			If lower, it's an aunt/uncle.

		e.g. If a series of headers is: [1, 2, 2, 3, 2, 3, 4, 2]
			a hierarchy is produced like:
				1
					2
					2
						3
					2
						3
							4
					2

			Notably, between the last two headers, it drops 2 levels, 
			by popping stack frames until the stack's level matches the current header.

			Certain cases will produce weird results, like: [1, 2, 4, 3],
			which produces a hierarchy like:
				1
					2
						4
					3

			In these cases, the author intent is unclear.

		Under normal circumstances, with single increasing steps between adjacent nodes,
		the hierarchy will be generated with headers simply being at a hierarchical level
		that linearly corresponds to their header number.
	*/
	var listStack = [$("#toc")];
	var headLevel = 1;

	$("h1, h2, h3, h4, h5, h6").each(function(){
		var text = $(this).html();
		var dasherizedText = dasherize(text);

		this.id = dasherizedText; // Set the id to anchor to

		var level = headerLevel(this);

		var newNode = document.createElement("li");
		newNode.innerHTML = "<a href='#" + dasherizedText + "'>" + text + "</a>";

		var topList = last(listStack);

		// If level === headLevel, just append onto the topList, otherwise make adjustments to the stack

		if(level > headLevel){
			// If the current node's heading level is higher than the last, add a new list to the last node
			var newList = document.createElement("ul");
			newList.className = "nav"; // Bootstrap requires a .nav for Scrollspy to work properly.

			var headNode = topList.children("li:last-of-type");
			$(headNode).append(newList);
			listStack.push($(newList));
		}

		// If the current node's heading level is lower than the last, pop the list until they're equal.
		while(level < headLevel--){
			listStack.pop();
		}

		topList = last(listStack);
		headLevel = level;

		topList.append(newNode);
	});

	$(document.body).scrollspy({target: "#toc-container"}).scrollspy("refresh");
});
