//~~~~~~~~~~~~~~~~~~~~GET START DAY & # OF WEEKS FROM USER INPUT~~~~~~~~~~~~~~~~~~~~~~~~~
function listOfWeeks(startDay, numberOfWeeks) {
  
  // var dateString = Utilities.formatDate(startDay, 'MMMM dd, yyyy 00:00:00 -0800');
  
  var numWeeks = (1000 * 60 * 60 * 24)*(7)*(numberOfWeeks);
  var endTimeFrame = new Date(startDay.getTime() + numWeeks);
  
  var listWeeks = [];
  var startEnd = [];
  for (i=0; i < numberOfWeeks; i++) {
    var week = (1000 * 60 * 60 * 24)*(7);
  
    var startWeek = new Date(startDay.getTime() + week*i);

    var endWeek = new Date(startDay.getTime() + week*(i+1));
    
    var startEnd = [startWeek,endWeek];
    listWeeks.push(startEnd);
  };
  //~~~~~~~~~~~~~~~RETURN A LIST OF START/END DAYS OF FOR # OF WEEKS~~~~~~~~~~~~~~~~~~~~~~
  // Logger.log(listWeeks);
  return listWeeks;

  // Logger.log('%s , %s',startWeek1, endTimeFrame);
}


//~~~~~~~~~~~~~~~~~~TAKE START/END DAYS FOR INDIVIDUAL DAY or WEEK~~~~~~~~~~~~~~~~~~~~
function trackEvents(timeMin, timeMax){
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
  // Logger.log(events);
  return events;
}


//~~~~~~~~~~~~~~TAKE LIST OF EVENTS FOR ONE DAY or WEEK~~~~~~~~~~~~~~~~~~~~~~~~~~~
function getEventDetails(events) {
  
  // Access Google Calendar Time Tracker spreadsheet and input data for specified color category.
  // Create array of category cells (location in spreadsheet). index 0 is 'undefined' cell.
  var cellColorArray1 = defineCellRange('Calendar Data Import', 'D');
  
  // Populate cells with 0.00 to reset
  for (i = 0; i < 12; i++) {
    cellColorArray1[i].setValue(0);
  }
  
  // Get time and color of event per week
  if (events.length == 0) {
    Logger.log('No events found.');
    }
  else {
    // loop through the events
    for (i = 0; i < events.length; i++) {    
      // get one event from the list of events
      var myEvent = events[i];
      // get the color of the single event
      var colorID = parseInt(myEvent.colorId);
      // get the start date of the single event and convert format
      var start = new Date(getDateFromIso(myEvent.start.dateTime));
      // get the end date of the single event and convert format
      var end = new Date(getDateFromIso(myEvent.end.dateTime));
      // Get duration of event
      var duration = ((end - start)/(1000 * 60 * 60)); 
      // Check if all day event
      if (myEvent.start.date) {
        Logger.log('%s (%s)', myEvent.summary, 'ALL DAY EVENT');
      }
      else {
//~~~~~~~~~~~~~~INPUT EVENT DETAILS INTO SPREADSHEET~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //////////////////////CONDENSE CODE////////////////////////////////
      // Add total duration per week for each color in spreadsheet
        switch(colorID){
          case 1:
            // Fitness
            var cellContents = cellColorArray1[1].getValue();
            cellColorArray1[1].setValue(cellContents + duration);
            break;
          case 2:
            // Plan
            var cellContents = cellColorArray1[2].getValue();
            cellColorArray1[2].setValue(cellContents + duration);
            // Logger.log('%s (%s) [%s]', myEvent.summary,duration,start);
            break;
          case 3:
            // Mix
            var cellContents = cellColorArray1[3].getValue();
            cellColorArray1[3].setValue(cellContents + duration);
            // Logger.log('%s (%s) [%s]', myEvent.summary,duration,start);
            break;
          case 4:
            // Social 
            var cellContents = cellColorArray1[4].getValue();
            cellColorArray1[4].setValue(cellContents + duration);
            break;
          case 5:
            // Cook / Eat
            var cellContents = cellColorArray1[5].getValue();
            cellColorArray1[5].setValue( cellContents + duration);
            // Logger.log('%s (%s)', myEvent.summary,duration);
            break;
          case 6:
            // Piano
            var cellContents = cellColorArray1[6].getValue();
            cellColorArray1[6].setValue( cellContents + duration);
            break;
          case 7:
            // UI / Marketing
            var cellContents = cellColorArray1[7].getValue();
            cellColorArray1[7].setValue( cellContents + duration);
            break;
          case 8:
            // Read
            var cellContents = cellColorArray1[8].getValue();
            cellColorArray1[8].setValue( cellContents + duration);
            break;
          case 9:
            // Code
            var cellContents = cellColorArray1[9].getValue();
            cellColorArray1[9].setValue( cellContents + duration);
            break;
          case 10:
            // Job
            var cellContents = cellColorArray1[10].getValue();
            cellColorArray1[10].setValue( cellContents + duration);
            break;
          case 11:
            // Travel 
            var cellContents = cellColorArray1[11].getValue();
            cellColorArray1[11].setValue( cellContents + duration);
            // Logger.log('%s (%s)', myEvent.summary,duration);
            break;
          default:
            // Generic Tasks
            var cellContents = cellColorArray1[0].getValue();
            cellColorArray1[0].setValue(cellContents + duration);
            // Logger.log('%s (%s) [%s]', myEvent.summary,duration,start);
            break;
            ///////////////////////////////////////////////////////
        }
      }
    }
  } 
}






/*
~~~~~~~~~~~PSEUDO CODE~~~~~~~~~~~~~~~~

-create list [(date1, date2),(date2, date3), etc...]
list = []
for (i=0; i<=(number Of Weeks); i++) {
  var week1 = (1000 * 60 * 60 * 24)*(7);
  
  var startWeek = new Date(timeMin.getTime() + week(i);

  var endWeek = new Date(timeMax.getTime() + week(i+1));
  
  list.push(startWeek, endWeek)
  
}
// If a cell in row 1 of 'Calendar Data by Week' equals (timeMin - 1 day), then insert data into that column

for (i=0; i<(number of items in list); i++){
  Clear spreadsheet column
  Tracking function((list[i])[0], (list[i])[1])
}

Clear spreadsheet column
Tracking function(start week date, end week date): run script from start date to end of week 
log weekly data into ss data input column
Copy data input column to weekly tracker spreadsheet
then repeat function
*/