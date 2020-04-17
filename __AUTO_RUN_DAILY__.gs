function autoRunScriptDaily() {
  
  // Get day/time exactly 24 hours ago.
  var startDay1 = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
  var endDay1 = new Date();
  Logger.log("%s - %s", startDay1, endDay1);
  var eventsList = trackEvents(startDay1, endDay1);
  // Logger.log(eventsList)
  
  getEventDetails(eventsList);
  dailyCalendarTracker(startDay1);
}