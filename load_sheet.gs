function load_sheet(DATE_REPORT) {
  var date = new Array();
  var year = new Array();
  var hidden_site = new Array();
  var date_time = DATE_REPORT.split('');

  //Find "," in order to copy just the date, not the time
  var j = 0;  
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

 ////declare the existing spreadsheet
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sh_Main = ss.getSheetByName("Main");
 var sh_ListOptions = ss.getSheetByName("List Options"); 
 
 //Site to filter
 var site = sh_Main.getRange("E11").getValue(); 
  
 //Set the Hidden sites
 var lastrow = last_row("B",sh_ListOptions)+1;
 var range_row = "B3:B"+lastrow; 
 var sites =  sh_ListOptions.getRange(range_row).getValues();
 var l = 0; 
 for(i in sites){
   if (sites[i] !=  site) {
     hidden_site[l]=sites[i];
     l++;
   } 
 }

 //Load the requested sheet
 SpreadsheetApp.setActiveSheet(ss.getSheetByName(("Report "+date+", "+year)));
 
 //Create the filter, code from https://stackoverflow.com/questions/51448537/google-script-for-sheets-set-multiple-filters
 var sheet = ss.getSheetByName("Report "+date+", "+year);
 var range = sheet.getDataRange();  
 var filtercriteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(hidden_site).build();
 
 //getFilter already available or create  a new one
 var filter = range.getFilter() || range.createFilter();
 //set the criteria against Col11 (K column -> Sites)
 filter.setColumnFilterCriteria(11, filtercriteria);
}
