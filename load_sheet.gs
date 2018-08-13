function load_sheet(DATE_REPORT) {
  var date_time = DATE_REPORT.split('');
  var date = new Array();
  var year = new Array();
  var j = 0;
  
  
  //Find "," in order to copy just the date, not the time
  for (var i in date_time) {
    j++;
    if (date_time[i] == ",") {
      break; 
    }
    date[i] =  date_time[i];
  }
  
  //Add the year
  for (k=0; k<4; k++){
    year[k] =  date_time[j+1+k];
  }    
   
  //Remove the ","
  date = date.toString().replace(/,/g,'');
  year = year.toString().replace(/,/g,'');

 //Load the requested sheet
 var sheet = SpreadsheetApp.getActiveSpreadsheet();
 SpreadsheetApp.setActiveSheet(sheet.getSheetByName(("Report "+date+", "+year)));
}
