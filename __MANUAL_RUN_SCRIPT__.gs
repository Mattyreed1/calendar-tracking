function runScriptManual() {
  
  //~~~~~~~~Manually input information.~~~~~~~~
  // Input Monday date. Use the exact formatting as seen below.
  var inputStartDay = 'May 4, 2020 00:00:00 -0800';
  var inputEndDay = 'null';
  var inputNumOfWeeks = 1;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  var startDay = new Date(inputStartDay);  
  Logger.log(startDay);
  var list = listOfWeeks(startDay,inputNumOfWeeks);
  Logger.log(list);
  for (n = 0; n < list.length; n++){
    Logger.log('%s - %s', list[n][0], list[n][1]);
    var eventsList = trackEvents(list[n][0], list[n][1]);
    getEventDetails(eventsList);
    weeklyCalendarTracker(list[n][1]);
  }
}