var users_url = "___you_URL__/api/v1/users/search?query=email:";
var roles_url = "___you_URL__/api/v1/roles/";
var token = "___you_token_with_admin.role_admin.user_permissions__";


function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  var menu = ui.createMenu('Funzioni custom')
    //.addItem('Search user', 'getRoles')
    menu.addItem('Search Text Modules by Ids Groups','searchTextModulesByGroupIds')
    menu.addItem('Search by E-mail', 'insertUser')
    menu.addToUi();
}

function insertUser() {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var result = ui.prompt('Specify the user email to look up', 'es. cdcfscl@youdomain.com', ui.ButtonSet.OK_CANCEL);

  var button = result.getSelectedButton();
  var prompt_email = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
    cerca = getRoles(prompt_email);
  } /*else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('Azione cancellata');
  } else if (button == ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert('');
  }*/
}


function getRoles(prompt_email) {

  var foglioTarget = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("get user roles");
  var utente = prompt_email;

  //utente = foglioTarget.getRange(1, 1).getValues()[0][0];
  params = {
    "method": "get",
    "contentType": "application/json",
    "headers": { "Authorization": "Token token=" + token }
  };
  var utente_zammad = UrlFetchApp.fetch(users_url + utente, params).getContentText();
  var pars_utente_zammad = JSON.parse(utente_zammad);
  var ids_ruoli_utente = pars_utente_zammad[0]["role_ids"];
  Logger.log(pars_utente_zammad[0]["role_ids"]);

  for (var i = 0; i < ids_ruoli_utente.length; i++) {
    var id = ids_ruoli_utente[i].toString();
    var oggetto_ruolo = UrlFetchApp.fetch(roles_url + id, params).getContentText();
    var pars_oggetto_ruolo = JSON.parse(oggetto_ruolo);
    var oggetto_ruolo_name = pars_oggetto_ruolo["name"];
    Logger.log(oggetto_ruolo_name);
    // Riporta nella colonna 1
    utente = foglioTarget.getRange(i + 1, 1).setValue(oggetto_ruolo_name);
  }

}
