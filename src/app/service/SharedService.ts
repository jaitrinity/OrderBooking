import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from 'src/app/shared/constant/Constant';

@Injectable()
export class SharedService{

    private serviceEndPoint;
    // private localEndPoint;
    constructor(private http:Http){
        this.serviceEndPoint = Constant.serverURL;
        // this.localEndPoint = Constant.localServerURL;
    }

    getDealerCodeByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getDealerCodeByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllApiData(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getAllApiData';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPerformanceByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getPerformanceByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getOutstandingByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getOutstandingByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getVisitStatusByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getVisitStatusByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPendingOrderByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getPendingOrderByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getNonVisitedDealerListByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getNonVisitedDealerListByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getNetworkExpansionByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getNetworkExpansionByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTerritoryCodeByEmpId(jsonData: any) {
        this.serviceEndPoint = Constant.serverURL+'getTerritoryCodeByEmpId';
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", "*");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint, jsonData, options)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
      
}