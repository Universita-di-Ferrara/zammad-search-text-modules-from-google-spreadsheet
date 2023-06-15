var GET_URL = "___your_url___/api/v1/groups";
var MY_TOKEN = "___your_token_with_admin.group_permission___";

function groupCheck() {
  /**for (var i = 0; i < response.length; i++) {
    ticketBody += "<strong>"+response[i].getItem().getTitle() +"</strong>: " + response[i].getResponse() + "<br/>"; 
  }**/

  

  var options = {
    "method": "get",
    "contentType": "application/json",
    "headers": { "Authorization":"Token token=" + MY_TOKEN },
  }

  var risposta = UrlFetchApp.fetch(GET_URL, options);
  var parseRes = JSON.parse(risposta);
  Logger.log(parseRes[0]["id"]);
  var foglioTarget = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("get groups");
  
  for (i =0 ; i<parseRes.length;i++){
    Logger.log(parseRes[i]["id"]);
    foglioTarget.getRange((i+2),1).setValue(parseRes[i]["id"]);
    foglioTarget.getRange((i+2),2).setValue(parseRes[i]["name"]);
    foglioTarget.getRange((i+2),3).setValue(parseRes[i]["note"]);
    
  }
  


};
