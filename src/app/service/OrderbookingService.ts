import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Constant } from '../shared/constant/Constant';

@Injectable()
export class OrderBookingService{
    private serviceEndPoint;
    // private localEndPoint;
    constructor(private http:Http){
        this.serviceEndPoint = Constant.serverURL;
        // this.localEndPoint = Constant.localServerURL;
    }

    getDivisionNameDistributionChannel(jsonData: any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDivisionNameDistributionChannel', jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDealerByTerritoryCode(jsonData: any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDealerByTerritoryCode', jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDocumentTypeByPlant(jsonData: any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDocumentTypeByPlant',jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getProductDetails(jsonData: any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getProductDetails',jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getOtherFieldData(jsonData: any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getOtherFieldData',jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    submitOrderBookingData(jsonData: any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'submitOrderBookingData',jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAnyPostRequestData(postRequest : string, jsonData: any) {
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+postRequest,jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // deleteTransactionAndDetails(jsonData: any) {
    //     let headers = new Headers({'Content-Type':'application/json'});
    //     headers.append("Access-Control-Allow-Origin", "*");
    //     let options = new RequestOptions({ headers:headers });
    //     return this.http.post(this.localEndPoint+"deleteTransactionAndDetails",jsonData, options)
    //            .map((response:Response) => response.json())
    //            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    // }
}