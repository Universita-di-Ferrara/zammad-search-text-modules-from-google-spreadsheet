var GET_URL_TM = "{____your_zammad_url____}/api/v1/text_modules";
var MY_TOKEN_TM = "{____your_token_with_admin.text_module_persmissions____}";


function searchTextModulesByGroupIds() {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var result = ui.prompt('Insert the group id', ui.ButtonSet.OK_CANCEL);

  var button = result.getSelectedButton();
  var idGroup = parseInt(result.getResponseText());
  console.log(idGroup)
  if (button == ui.Button.OK) cerca = cercaTextModuleZammad(idGroup);

}

function searchByGroups(array, groupID) {
  var returnArray = []
  // for every array that zammad sends back i'll check if campo group_ids contains the id i'm looking for and i push it in the return array
  array.forEach(function (element) {
    var groupsIDs = element.group_ids
    if (groupsIDs.includes(groupID)) returnArray.push(element)
  })
  
  return returnArray
}

function insertInExcel(arrayTM) {
  try {
    var foglio = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("get text modules")
    //clean up the google sheets tab in case there are not empty cells 
    if (foglio.getLastRow() !=0 && foglio.getLastColumn() !=0) foglio.getRange(2,1,foglio.getLastRow(),foglio.getLastColumn()).clear()
    var arrayFinale = []
    // going to look for the bidimensional array to push into cells, 
    // for every element i'm selecting ID,keywords,title,content e group_ids
    arrayTM.forEach(function (element) {
      //since Google in not inserting the of groups_ids in a single cell I'll create a string with those values.
      var stringGroupsIDs = element.group_ids.join(", ")
      arrayFinale.push([element.id, element.keywords, element.name, element.content, stringGroupsIDs])
    })
    console.log(arrayFinale)
    foglio.getRange(2, 1, arrayFinale.length, arrayFinale[0].length).setValues(arrayFinale)
  }catch (error) {
    throw new Error("Error in insertInExcel. :"+error)
  }
}

function cercaTextModuleZammad(groupID) {

  var options = {
    "method": "get",
    "contentType": "application/json",
    "headers": { "Authorization": "Token token=" + MY_TOKEN_TM },
    //"muteHttpExceptions":true // In case you need a clean response message for debugging reasons
  }
  try {
    var response = UrlFetchApp.fetch(GET_URL_TM, options).getContentText()
    var json = JSON.parse(response)
    console.log(json)
    var arrayTM = searchByGroups(json, groupID)
    insertInExcel(arrayTM)

  } catch (error) { console.log(error) }
}
