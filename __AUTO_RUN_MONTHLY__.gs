function autoRunScriptMonthly() {
  // Get date from beginning of the first day of the month
  var endOfMonth = new Date();
  var month = endOfMonth.getMonth();
  var year = endOfMonth.getFullYear();
  
  var startOfMonth = new Date(year, month, 1);
  
  var eventsLits = trackEventsFromPastMonth(startOfMonth, endOfMonth);
  categorizeEvents(eventsLits)
  // log time from past month.
    // Create array with each category and sum time in hours
  
  // Input into next available column
}