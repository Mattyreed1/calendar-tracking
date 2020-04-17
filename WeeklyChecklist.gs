function weeklyChecklistTracker() {
  var ss = SpreadsheetApp.getActive();
  var weeklyOutput = ss.getSheetByName('Weekly Checklist Data');
  var dataInputSheet1 = ss.getSheetByName('Weekly Task Checklist');
  var weeklyDataRange1 = weeklyOutput.getDataRange();
  var numRows1 = weeklyDataRange1.getNumRows();
  var numColumns1 = weeklyDataRange1.getNumColumns();
  var nextColumn1 = numColumns1 + 1;
  Logger.log(numColumns1);
  var endOfWeek = new Date();
  weeklyOutput.getRange(1, nextColumn1).setValue(new Date(endOfWeek.getTime()-(24*3600*1000)));
  
  for (var i=2; i <= numRows1; i++){
    var percentages = dataInputSheet1.getRange(i, 4).getValue();
    weeklyOutput.getRange(i, numColumns1 + 1).setValue(percentages);
  } 
}