function weeklyChecklistTracker() {
  var ss = SpreadsheetApp.getActive();
  var weeklySheet = ss.getSheetByName('Weekly Checklist Data');
  var dataInputSheet = ss.getSheetByName('Weekly Task Checklist');
  var weeklyDataRange = weeklySheet.getDataRange();
  var numRows = weeklyDataRange.getNumRows();
  var numColumns = weeklyDataRange.getNumColumns();
  var nextColumn = numColumns + 1;
  
  var endOfWeek = new Date();
  weeklySheet.getRange(1, nextColumn).setValue(new Date(endOfWeek.getTime()-(24*3600*1000)));
  
  for (var i=2; i <= numRows; i++){
    var percentages = dataInputSheet.getRange(i, 4).getValue();
    weeklySheet.getRange(i, numColumns + 1).setValue(percentages);
  } 
}