//~~~~~~GLOBALS~~~~~~
/*
var ui = SpreadsheetApp.getUi();
*/
//~~~~~~~~~~~~~~~~~~~


function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  // Create menu options
  ui.createMenu('Calendar Tracker App')
    .addItem("Run the Script", "initializeDialog")
    .addToUi();
};


function initializeDialog() {
  var ui = SpreadsheetApp.getUi();
  // Call the HTML file and set the width and height
  var html = HtmlService.createTemplateFromFile('Dialog')
    .evaluate()
    .setWidth(450)
    .setHeight(450);
  
  // Display the dialog
  var dialog = ui.showModalDialog(html, "Time Tracker Script");
  
  // return html
};


function runScriptFromInput(startDateInput, endDateInput) {
  
  //Convert date strings to usable formatt.
  var startMomentDate = Moment.moment(startDateInput, "MM/DD/YYYY").toDate();
  var endMomentDate = Moment.moment(endDateInput, "MM/DD/YYYY").toDate();
  
  //Display the values submitted from the dialog box in the Logger.
  Logger.log("Start date - End date = %s - %s",startMomentDate, endMomentDate);
  Logger.log(startMomentDate.getDay(),endMomentDate.getDay());
  
  /*
  var list = listOfWeeks(startMomentDate, endMomentDate);
  Logger.log("list of weeks %s", list);
  
  var eventsList = trackEvents(list[0][0], list[0][1]);
  getEventDetails(eventsList);
  nextColumn = weeklyCalendarTracker(list[0][1],0);
  Logger.log('First column is %s, next column is %s', (nextColumn-1),nextColumn);
  
  for (n = 1; n < list.length; n++){
    Logger.log('%s - %s', list[n][0], list[n][1]);
    var eventsList = trackEvents(list[n][0], list[n][1]);
    getEventDetails(eventsList);
    // run weekly tracker that starts at index of nextColumn. This cuts out the repetitive iteration thru dates.
    weeklyCalendarTracker(list[n][1],nextColumn);
    nextColumn = nextColumn + 1;
    Logger.log('Next column is %s', nextColumn);
   }
  */
  autoRunScriptDaily(startMomentDate,endMomentDate);
};


function closeIt(){
  google.script.host.close()
};

function testFunc(){
  Logger.log("It worked");
  return "It worked";
};

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

function testSpinner(){
 SpreadsheetApp.getActiveSpreadsheet().toast("Copying...","",-1);
  Utilities.sleep(5000);
 SpreadsheetApp.getActiveSpreadsheet().toast("Done.");
}

/*
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function doSomething() {
  Logger.log('I was called!');
}
*/