export class Constant{
    
    // public static serverURL = "http://localhost:8080/HSIL_SOAP_API/hsil/";
    // public static serverURL = "http://localhost:8080/Order_Booking_API/hsil/";

    public static serverURL = "http://www.fast.org.in:8080/Order_Booking_API/hsil/";

    // public static serverURL = "/Order_Booking_API/hsil/";

    // public static serverURL = "https://www.fast.org.in:8443/Order_Booking_API/hsil/";

    public static SUCCESSFUL_RESPONSE = "100000";
    public static SUCCESSFUL_STATUS_CODE = "100000";
    public static GENERIC_DATABASE_ERROR = "-102003";
    public static NO_RECORDS_FOUND_CODE = "102001";
    public static NO_RECORD_FOUND = "No Record Found";
    public static TRINITY_PRIVATE_KEY = "TRINITYPRIVATEKEY";
    public static GOOGLE_MAP_API_KEY = "AIzaSyDkv0_3UwK1Y_EpQ1LHQr5KA5oVBMc1160";
    public static SERVER_ERROR = "Server Error";
    public static MINUTES_UNITL_AUTO_LOGOUT = 30; // in mins
    public static CHECK_INTERVAL = 15000; // in ms
    public static STORE_KEY =  'lastAction';
    public static MATERIAL_CODE =  'MATERIAL_CODE';
    public static MATERIAL_DESC =  'MATERIAL_DESC';
    public static CATELOG_NUMBER =  'CATELOG_NUMBER';
    public static TOSTER_FADEOUT_TIME = 3000;

    public static returnServerErrorMessage(serviceName:string):string{
        return "Server error while invoking "+serviceName+ " serive";
    }
    
}