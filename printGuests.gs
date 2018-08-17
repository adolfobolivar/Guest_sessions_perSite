//Print List_Users information in a new sheet
function printGuestSessions(data,keys,Last_Row_Users){

 //Extract Date and time
 var currentDate = new Date().toLocaleDateString();
 var currentTime = new Date().toLocaleTimeString();
  
 //declare the existing spreadsheet 
 var ss = SpreadsheetApp.getActiveSpreadsheet(); 
 var sh_ListOptions = ss.getSheetByName("List Guest Sessions");
  
 //List the User MAC Addresses by setting the correct range of Users
 var sh_ListAdding = ss.getSheetByName("List Users");
 var range = "D"+Last_Row_Users+":D";
 var User_MAC = sh_ListAdding.getRange(range).getValues();  
   
 //next empty row  
 var lastrow = last_row("B",sh_ListOptions)+2;

 //Print the date in next empty row
 sh_ListOptions.getRange(lastrow,1).setValue(currentDate+" "+currentTime);


 //Print data,change the Epoch time format to human readable format, change MAC address format, and change seconds to minutes+seconds 
  for (i = 0; i < data["sessions"].length; i++) { 
   for (j = 0; j < keys.length; j++) { 
      if (keys[j] == "login_at"){
         sh_ListOptions.getRange(lastrow+1+i,j+2).setValue(new Date (data["sessions"][i][keys[j]]*1000).toLocaleDateString()+" "+ new Date(data["sessions"][i][keys[j]]*1000).toLocaleTimeString());
         
      }
      else if (keys[j] == "account_session_time"){
        time = data["sessions"][i][keys[j]];
        min = (time - (time%60))/60;
        s = time - (min*60);
        sh_ListOptions.getRange(lastrow+1+i,j+2).setValue(min+"min "+s+"seg");
        //print session time in seconds (by default)
        sh_ListOptions.getRange(lastrow+1+i,j+11).setValue(data["sessions"][i][keys[j]]);
      }
     
     //add "AP Name", "AP Serial", "connection" and "Site Label" information to report
     else if (keys[j] == "mac_address"){
     sh_ListOptions.getRange(lastrow+1+i,j+2).setValue(print_MAC(data["sessions"][i][keys[j]]));
     
     //Search by User MAC Addres, match, add "AP Name","AP Serial","connection" and "Site Label" information to report
        var k=0;
             for (var l in User_MAC) {  
                k++;                
                if (User_MAC[k] == sh_ListOptions.getRange(lastrow+1+i,j+2).getValue()){ 
                  break;
                  }
           }
          //AP Name
          sh_ListOptions.getRange(lastrow+1+i,j+2+4).setValue(sh_ListAdding.getRange(k+Last_Row_Users,6).getValue());
          //AP Serial
          sh_ListOptions.getRange(lastrow+1+i,j+2+5).setValue(sh_ListAdding.getRange(k+Last_Row_Users,7).getValue());
          //Connection
          sh_ListOptions.getRange(lastrow+1+i,j+2+3).setValue(sh_ListAdding.getRange(k+Last_Row_Users,8).getValue());  
          //Site Label
          sh_ListOptions.getRange(lastrow+1+i,j+2+6).setValue(sh_ListAdding.getRange(k+Last_Row_Users,9).getValue());       
       
     }
     else {
        sh_ListOptions.getRange(lastrow+1+i,j+2).setValue(data["sessions"][i][keys[j]]);
      }
    }
  }  
}
