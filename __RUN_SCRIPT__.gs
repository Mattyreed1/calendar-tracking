function runScript() {
  
  //~~~~~~~~Manually input information.~~~~~~~~
  var inputStartDay = 'March 2, 2020 00:00:00 -0800';
  var inputNumOfWeeks = 1;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var startDay = new Date(inputStartDay);  
  Logger.log(startDay);
  var list = listOfWeeks(startDay, inputNumOfWeeks);
  Logger.log(list);
  for (n = 0; n < list.length; n++){
    Logger.log('%s - %s', list[n][0], list[n][1]);
    var eventsList = trackerTestScript(list[n][0], list[n][1]);
    getEventDetails(eventsList);
    weeklyCalendarTracker(list[n][1]);
  }
}