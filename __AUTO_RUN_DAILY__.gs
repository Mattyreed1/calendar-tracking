function autoRunScriptDaily(startDay,endDay) {
  
  Logger.log(startDay,endDay);
  if (startDay && endDay){
    var list = listOfDays(startDay, endDay);
    Logger.log("list of days %s", list);
    for (n = 0; n < list.length; n++){
       Logger.log('%s - %s', list[n][0], list[n][1]);
       var eventsList = trackEvents(list[n][0], list[n][1]);
       getEventDetails(eventsList);
       dailyCalendarTracker(list[n][0]);
    }
  }
  else {
    // if start and end day are null (during an auto-run)... 
    // Get day/time exactly 24 hours ago.
    var startDay1 = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
    var endDay1 = new Date();
    Logger.log("%s - %s", startDay1, endDay1);
    var eventsList = trackEvents(startDay1, endDay1);
    // Logger.log(eventsList)
    getEventDetails(eventsList);
    dailyCalendarTracker(startDay1);
  }
}