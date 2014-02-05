function setupLinks(target, dictionary){
	// Dictionary is of the form [<token>, <href>]
	// The dictionary should be sorted in order of priority,
	// usually longest patterns first.
	// e.g. If you have "Field Watchman" and "Field", you want
	// "Field Watchman" to precede "Field" so that 

	// Super naive pattern replacement.
	// Doesn't check the token's context.  Will break some HTML.
	var $target = $(target);
	var string = $target.html();

	var i, len = dictionary.length;
	for(var i=0; i<len; i++){
		var entry = dictionary[i];
		// Jekyll does some crap where regular apostrophes (') turn into front ticks (’) or something
		var tok = entry[0].replace(/['’]/g, "['’]");
		var href = entry[1];

		/* 
			The [^!] part is a really rudimentary way to make sure
			we're not writing over our own links by checking
			the token isn't preceded by an exclamation point.

			This is as close as JS gets to regex lookbehind without
			jumping through some crazy hoops like reversing the
			target string and all of the search patterns.

			There are two captured groups:
			$1 - The preceding non-marker character, which is just replaced before the new link.
			$2 - The token matching the dictionary entry, which is wrapped in the link tags
		*/
		var tokRE = new RegExp("([^!])\\b(" + tok + ")\\b", "g");
		string = string.replace(
			tokRE,
			'$1<a href="' + href + '">!$2</a>'
		);
	}

	// Clean up the markers after we're done processing the dictionary
	string = string.replace(/>!/g, ">");

	$target.html(string);
}

$(document).ready(function(){
	setupLinks(document.body, AgricolaDictionary);
});
