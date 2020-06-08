function autoRunScriptWeekly() {
  
  weeklyChecklistTracker();
  
  // Get day exactly 1 week ago.
  var startDay = new Date(new Date().getTime() - (1000 * 60 * 60 * 24)*(7));
  Logger.log(startDay);
  var list = listOfWeeks(startDay, 'null', 1);
  Logger.log(list);
  for (n = 0; n < list.length; n++){
    Logger.log('%s - %s', list[n][0], list[n][1]);
    var eventsList = trackEvents(list[n][0], list[n][1]);
    getEventDetails(eventsList);
    weeklyCalendarTracker(list[n][1]);
  }
}
