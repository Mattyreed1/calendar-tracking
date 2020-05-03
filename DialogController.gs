//~~~~~~GLOBALS~~~~~~

var ui = SpreadsheetApp.getUi();

function onOpen(e) {
  // Create menu options
  ui.createAddonMenu()
    .addItem("Test the Script", "initializeDialog")
    .addToUi();
};


function initializeDialog() {
  // Call the HTML file and set the width and height
  var html = HtmlService.createTemplateFromFile('Dialog')
    .evaluate()
    .setWidth(450)
    .setHeight(450);
  
  // Display the dialog
  var dialog = ui.showModalDialog(html, "Script Tester");
  
  // return html
};


function loggerFunc(startDateInput, endDateInput) {
  //Display the values submitted from the dialog box in the Logger.
  Logger.log("Start date - End date = %s - %s",startDateInput, endDateInput);
};


function closeIt(){
  google.script.host.close()
};

function testFunc(){
  return "It worked"
};

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

/*
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function doSomething() {
  Logger.log('I was called!');
}
*/