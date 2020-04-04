function runScript() {
  var startDay = new Date('March 2, 2020 00:00:00 -0800');
  Logger.log(startDay);
  var list = listOfWeeks(startDay, 4);
  Logger.log(list);
  for (n = 0; n < list.length; n++){
    Logger.log('%s - %s', list[n][0], list[n][1]);
    var eventsList = trackerTestScript(list[n][0], list[n][1]);
    getEventDetails(eventsList);
    weeklyCalendarTracker(list[n][1]);
  }
}