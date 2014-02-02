function dasherize(str){
	return str.toLowerCase().split(" ").join("-");
}

$(document).ready(function(){
	$("h1, h2, h3, h4, h5, h6").each(function() {
		var current = $(this);
		var text = current.html();
		var dasherizedText = dasherize(text);
		this.id = dasherizedText;
		$("#toc").append("<li><a href='#" + dasherizedText + "'>" + text + "</a></li>");
	});

	$(document.body).scrollspy({target: "#toc-container"}).scrollspy("refresh");
});
