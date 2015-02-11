/*
Program: jhabout.js
Purpose: create about functions
Author: Jeongjun Huh (Dennis Huh)
Last Updated: 2014-03-02
*/

function displayAbout() 
{
	$.get('config.xml', function (data) {
		$(data).find('widget').each(function () {
			// set recordset
			var $entry = $(this);
			// read attribute
			var html = "Version: " + $entry.attr('version') +"\n";
			// read below elements
			html += "App Name: " + $entry.find("name").text() + "\n";
			html += "Author: " + $entry.find("author").text();
			alert(html);
		});
	});
} // end function