/* This will be our JS file for expert*/
// Get the current URL
var url = new URL(window.location.href);
// Get the search parameters from the URL
var params = new URLSearchParams(url.search);
// Retrieve a specific parameter by name
var paramValue1 = params.get('param1');


