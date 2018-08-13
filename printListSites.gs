//Print List_Sites information in existing "List Options" sheet
function printListSites(data,keys){
 
 //Extract Date and time
 var currentDate = new Date().toLocaleDateString();
 var currentTime = new Date().toLocaleTimeString();
  
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Options");
   
 //Print Date and Time in B2 
  sh_ListOptions.getRange("B2").setValue(currentDate+" "+currentTime);
  
 //Print data in column B3 and below  
  for (i = 0; i < data["labels"].length; i++) { 
        sh_ListOptions.getRange(i+3,2).setValue(data["labels"][i][keys]);
      }
 
}
