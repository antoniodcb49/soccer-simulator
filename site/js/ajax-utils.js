    // Set up a namespace for our utility
    export let ajaxUtils = {};
    
    // Makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function(requestUrl, responseHandler, isJsonResponse) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() { 
            handleResponse(request, responseHandler, isJsonResponse); 
          };
        request.open("GET", requestUrl, true);
        request.send(null); // for POST only
      };
    
    // Only calls user provided 'responseHandler'
    // function if response is ready
    // and not an error
    function handleResponse(request, responseHandler, isJsonResponse) {
      if ((request.readyState == 4) &&
         (request.status == 200)) {
    
        // Default to isJsonResponse = true
        if (isJsonResponse == undefined) {
          isJsonResponse = true;
        }
    
        if (isJsonResponse) {
          responseHandler(JSON.parse(request.responseText));
        }
        else {
          responseHandler(request.responseText);
        }
      }
    }