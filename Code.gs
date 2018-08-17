// Apps Script services impose daily quotas and hard limitations, details here: 
//https://developers.google.com/apps-script/guides/services/quotas

//Aruba Central URL
var URL = "https://internal-apigw.central.arubanetworks.com";
//var URL = "https://app1-apigw.central.arubanetworks.com";

//declare the existing spreadsheet 
var ss = SpreadsheetApp.getActiveSpreadsheet(); 
var sh_Main = ss.getSheetByName("Main");

//Read the Access token on C2
var ACCESS_TOKEN = sh_Main.getRange("C2").getValue();

//Read the Refresh token on C3
var REFRESH_TOKEN = sh_Main.getRange("C3").getValue();

//Read the Client ID on F2
var CLIENT_ID = sh_Main.getRange("F2").getValue();

//Read the Client Secret on F3
var CLIENT_SECRET = sh_Main.getRange("F3").getValue();

//Read the SSID on E14
var GUEST_SSID = sh_Main.getRange("E14").getValue();

//Read the portal id using the portal name on E17
var PORTAL_ID = captive_id(sh_Main.getRange("E17").getValue());

//Read the date of interest using the portal name on E20
var DATE_REPORT = sh_Main.getRange("E20").getValue();


//-------------------------------------------------------------------------------------------------
//Get a new access token

function get_access_token() {
  var url = URL+"/oauth2/token?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET+"&grant_type=refresh_token&refresh_token="+REFRESH_TOKEN;
  var options =
      {
        "method"  : "POST"
      };
  var response = UrlFetchApp.fetch(url,options);
  var json = response.getContentText();
  var data = JSON.parse(json);
  sh_Main.getRange("C2").setValue(data["access_token"]);
  sh_Main.getRange("E8").setValue(data["access_token"]);
  sh_Main.getRange("C3").setValue(data["refresh_token"]);
}


//--------------------------------------------------------------------------------------------------

//https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
//Communications with Aruba Central via REST APIs

function ListSites() {
  var url = URL+"/central/v2/sites?access_token="+ACCESS_TOKEN+"&limit=100"; 
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;  
}

function ListSSIDs() {
  var url = URL+"/monitoring/v1/networks?access_token="+ACCESS_TOKEN; 
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;  
}

function ListSplashPages() {
  var url = URL+"/guest/v1/portals?access_token="+ACCESS_TOKEN+"&offset=0";   
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data; 
}


function ListAPs() {
  var url = URL+"/monitoring/v1/aps?access_token="+ACCESS_TOKEN+"&limit=100"; 
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;  
}


function ListUsers() {
  var url = URL+"/monitoring/v1/clients/wireless?access_token="+ACCESS_TOKEN+"&network="+GUEST_SSID+"&limit=100";
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;  
}


function ListGuestSessions() {
  var url = URL+"/guest/v1/portals/"+PORTAL_ID+"/sessions?access_token="+ACCESS_TOKEN+"&ssid_name="+GUEST_SSID+"&offset=0&sort=%2Baccount_name&limit=100";  
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data; 
}

//---------------------------------------------------------------------------------------------------------
//Main functions


function callListSites_callListAPs(){ 
  var data = ListSites();
  printListSites(data, ['label_name']);
  var data = ListAPs();
  printAPList(data, ['name','serial','site','status']);
}


function callListUsers_callGuestSessions(){ 
  var data = ListUsers();
  var Last_Row_Users = printUsersList(data, ['name','network','macaddr','ip_address','associated_device','connection']);
  var data = ListGuestSessions();
  printGuestSessions(data, ['account_name','account_session_time','login_at','mac_address','os_name','platform_name'],Last_Row_Users); 
}


function callListSSIDs(){ 
  var data = ListSSIDs();
  printSSIDsList(data, ['essid','type']);
}

function callSplashPages(){ 
  var data = ListSplashPages();
  printSplashPages(data, ['name','id']);
}

//---------------------------------------------------------------------------------------------------------
//Brings the specific report

function button_guest(){ 
  load_sheet(DATE_REPORT);
}
