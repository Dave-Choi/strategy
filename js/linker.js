function setupLinks(target, dictionary){
	// Dictionary is of the form [<token>, <href>]
	// Super naive pattern replacement.  
	// Doesn't check the token's context.  Will break some HTML.
	var $target = $(target);
	var string = $target.html();

	for(var i=dictionary.length-1; i>=0; i--){
		var entry = dictionary[i];
		var tok = entry[0];
		var href = entry[1];

		var tokRE = new RegExp("\\b" + tok + "\\b", "g");

		string = string.replace(
			tokRE,
			'<a href="' + href + '">$&</a>'
		);
	}
	$target.html(string);
}

$(document).ready(function(){
	setupLinks(document.body, AgricolaDictionary);
});
