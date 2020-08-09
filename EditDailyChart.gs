function updateDailyChart() {
  var ss = SpreadsheetApp.getActive();
  var dash = ss.getSheetByName('Dashboard');
  var dailyDataSheet = ss.getSheetByName('Calendar Data by Day')
  var charts = dash.getCharts();
  var dailyChart = dash.getCharts()[3];
  var dailyDataRange = dailyDataSheet.getDataRange();
  var numRows = dailyDataRange.getNumRows();
  var numColumns = dailyDataRange.getNumColumns();
  var nextColumn = numColumns + 1;
  var x = nextColumn - 30;
  var dailyDataNewRange = dailyDataSheet.getRange(1,x,12,30);
  // var testRange = dailyDataSheet.getRange("CL1:DQ13");
  var chartRange = dailyChart.getRanges()[0];
  
  dailyChart = dailyChart.modify()
  .removeRange(chartRange)
  .addRange(dailyDataNewRange)
  .setOption('backgroundColor.stroke', 'blue')
  .build();
  dash.updateChart(dailyChart);
  
}
