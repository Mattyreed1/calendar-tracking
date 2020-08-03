function trackEventsFromPastMonth(timeMin, timeMax){
  // Gets your primary Calendar 
  var calendarId = 'primary';
  
  
  // Define optional arguments
  var optionalArgs = {
    timeMin: (timeMin).toISOString(),
    timeMax: (timeMax).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 1000,
    orderBy: 'startTime',
  };
  Logger.log('%s - %s', timeMin, timeMax);
  
  // Get past week Events in array  
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  
//~~~~~~~~~~~~~~~~~~RETURN LIST OF EVENTS FOR SINGLE DAY or WEEK~~~~~~~~~~~~~~~~~~~~  
  //Logger.log(events);
  return events;
}

// Take list of events from past month
function categorizeEvents(events) {
  // Create Dict
  //????CONDENSE??????
  var categoryDict = {
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
    10:0,
    11:0,
  };
  // Categorize and Organize events into dictionary
  for (i = 0; i < events.length; i++) {    
    // get one event from the list of events
    var myEvent = events[i];
    // Check if all day event    
    if (myEvent.start.date) {
        Logger.log('%s (%s)', myEvent.summary, 'ALL DAY EVENT');
      }
    else {
      // get the color ID of the single event
      var colorID = parseInt(myEvent.colorId);
      // Set default events to colorID = 0
      if (!colorID){
        colorID = 0;
      }
      // get the start date of the single event and convert format
      var start = new Date(getDateFromIso(myEvent.start.dateTime));
      // get the end date of the single event and convert format
      var end = new Date(getDateFromIso(myEvent.end.dateTime));
      // Get duration of event
      var duration = ((end - start)/(1000 * 60 * 60)); 

      var eventName = myEvent.summary.toLowerCase();
      Logger.log('Color ID is %s. %s - %s hours', colorID, eventName, duration);
      
      categoryDict[colorID] = categoryDict[colorID] + duration;
    }
  }
  //Return dictionary where keys=colorIDs and values=hours of time
  Logger.log(categoryDict);  
  return categoryDict;
}


function inputEventData(categoryDict, date) {
  // Get Monthly data sheet
  var ss = SpreadsheetApp.getActive();
  var monthlySheet = ss.getSheetByName('Calendar Data by Month');
  var monthlyDataRange = monthlySheet.getDataRange();
  var numRows = monthlyDataRange.getNumRows();
  var numColumns = monthlyDataRange.getNumColumns();
  var nextColumn = numColumns + 1;
  
  // Map dictionary values to an array
  var dataInputArray = Object.values(categoryDict);
  Logger.log(dataInputArray);
  

  // Create map function to convert list to array and prep for input into spreadsheet.
  const map_fn = function(v) {
    return [ v ];
  };
  
  // Input column header to be the name of the month at next available column.
    // sheet.getRange('1, nextColumn').setFormula('=date(MMMM,YYYY)');
  monthlySheet.getRange(1, nextColumn).setValue(date).setNumberFormat("MMMM");

  // Input array of times at next available column.
  monthlySheet.getRange(2,nextColumn,dataInputArray.length).setValues(dataInputArray.map(map_fn)); 

}