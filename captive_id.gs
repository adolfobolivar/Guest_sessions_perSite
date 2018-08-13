function captive_id(captive_name) {
  
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Options");
 
 //read the column "Captive Portal Names"
 var captive_names = sh_ListOptions.getRange("D2:D").getValues(); 
 
 //Find the correct Captive ID 
 j=0;
 for (var i in captive_names) {  
   j++;
    if (captive_names[i] == captive_name){
       var captive_id = sh_ListOptions.getRange(j+1,5).getValue(); 
       break;
    }
 } 
 return captive_id; 
}
