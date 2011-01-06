
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}


function update_results(usertext) {
			
	if (show == "text") {

		var result_text = document.getElementById("result_text");
		result_text.innerHTML = usertext;
		
	} else {

		var results_div = document.getElementById("results");
		var results = document.createTextNode(usertext);

		var length = results_div.childNodes.length

		if (length > 0) {

			for (i = 0; i < length; i++) {
				results_div.removeChild(results_div.childNodes[0]);
			}
		}

		results_div.appendChild(results);			
		
	}		
}

function fetch_results() {
	var text_form = document.getElementsByTagName("form")[0];
	var url = text_form.getAttribute("action");

	var result_text = document.getElementsByTagName("textarea")[0].value;

	if (result_text == "") {
		update_results("");

	} else {

	  	var request =  new XMLHttpRequest();

		request.open("POST", url, true);
	  	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	  	request.setRequestHeader('Accept', 'text/plain');


	  	request.onreadystatechange = function() {
			var done = 4, ok = 200;
	    	if (request.readyState == done && request.status == ok) {
	      		if (request.responseText) {
	        		update_results(request.responseText);
	      		} else {
					update_results("");
				}
	    	}
	  	};	

	  	request.send("text=" + encodeURIComponent(result_text));				

	}
	
}


function show_usertext() {
		
	var text_form = document.getElementsByTagName("form")[0];
	var url = text_form.getAttribute("action");

	var result_text = document.getElementsByTagName("textarea")[0].value;

	if (result_text == "") {
		update_results("");

	} else {

		if (result_text == utext) {
		} else {
			fetch_results();
		}	
		
		utext = result_text;		

	}
	
	setTimeout("show_usertext()",200);
	
	
}

function removeSubmitButton() {
	var forms = document.getElementsByTagName("form");
	for (i = 0; i < forms.length; i++) {
		if (forms[i].getAttribute("class") == "usertext") {
			
			var input_elements = forms[i].getElementsByTagName("input");
			for (j = 0; j < input_elements.length; j++) {
				if (input_elements[j].getAttribute("type") == "submit") {
					forms[i].removeChild(input_elements[j]);
				}
			}
		}
		
	}
	
}

function change_output_type(obj) {
	
	var output_type = obj.getAttribute("id");
	
	var text_form = document.getElementsByTagName("form")[0];

	var url = "";
	
	if (text_form) {
		
		switch(output_type) {
		case "entities" :
			url = "/entities";
			break
		case "adjectives" :
			url = "/adjectives";
			break
		default:
		 	url = "/entities";
		}
		
		
		var output_type_buttons = document.getElementById("types");
		
		if (output_type_buttons) {
			var links = output_type_buttons.getElementsByTagName("a");
			
			var link_count = links.length;
			for ( var i=0, link_count; i< link_count; ++i ){
				if (links[i].getAttribute("id") !== output_type) { 
					links[i].setAttribute("class", "");					
				}
			}
			
		}
		
		obj.setAttribute("class", "active");
		
		text_form.setAttribute("action", url);
		fetch_results();
	}
	
}


var show = "html";

utext = "";

addLoadEvent(show_usertext);
addLoadEvent(removeSubmitButton);
