function autoRunScriptMonthly() {
  //~~~~~~~~Manually input information.~~~~~~~~
  var inputDay = 'August 1, 2020 00:00:00 -0800';
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  // Get date from beginning of the first day of the month
  var endOfMonth = new Date();
  Logger.log(endOfMonth);
  var day = endOfMonth.getDay();
  var month = endOfMonth.getMonth() - 1;
  var year = endOfMonth.getFullYear();
  
  // If run on January 1st, change to December of previous year.
  if (month < 0){
    var month = 11;
    var year = year - 1;
  };
  
  var startOfMonth = new Date(year, month, 1);
  Logger.log('Start of month is %s',startOfMonth);
  
  // Create list of events over past month.
  var eventsLits = trackEventsFromPastMonth(startOfMonth, endOfMonth);
  // Categorize events.
  var categoryDict = categorizeEvents(eventsLits);
  // Input times into Monthly tracker sheet.
  inputEventData(categoryDict, startOfMonth);
}