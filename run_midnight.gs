//At the end of the day,@12am, run the function
function run_midnight() {
 
 //Extract Date and time
 var currentDate = new Date().toLocaleDateString();
 var currentTime = new Date().toLocaleTimeString();
    
 //Declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Options");
 var sh_ListOptions2 = ss.getSheetByName("List Users");
 var sh_ListOptions3 = ss.getSheetByName("List Guest Sessions");
 var sh_day_report = ss.getSheetByName("Day Report");
 
 //Print the date in next empty row on column L
 var lastrow = last_row("L",sh_ListOptions)+2;
 sh_ListOptions.getRange(lastrow,12).setValue(currentDate+" "+currentTime);
 
 //Generate the "Day Report"
 removeDuplicates();
 
 //Create the sheet where the report is going to be saved 
 ss.insertSheet("Report "+currentDate);
 var yourNewSheet =  ss.getSheetByName("Report "+currentDate);
  
 //Copy the information from "Day report" to "Report+Date" 
 //Code from https://ctrlq.org/code/20239-copy-google-spreadsheets 
 var range = sh_day_report.getDataRange();
 var A1Range = range.getA1Notation();
 var SData = range.getValues();
 yourNewSheet.getRange(A1Range).setValues(SData); 
 
 
 //Clear the "List Users" Table, add the headers
sh_ListOptions2.clearContents();
 var header = ["Time","Device Name","SSID","MAC Address","IP Address","AP Serial","Connection","AP Name","Site"];
 sh_ListOptions2.appendRow(header);
 
 //Clear the "List Guest Sessions" Table, add the headers
 sh_ListOptions3.clearContents();
 var header = ["Time","User Name","Session Time","Login At","MAC Address","OS Name","Device Type","AP Name","AP Serial","Connection","Site","Session Time (sec)"];
 sh_ListOptions3.appendRow(header);
}
