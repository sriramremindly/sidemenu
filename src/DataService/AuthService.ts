import { Injectable, Inject,InjectionToken } from '../../node_modules/@angular/core';
import { Http, HttpModule, RequestOptions, Headers } from '../../node_modules/@angular/http';
import { HttpHeaders, HttpResponse } from '../../node_modules/@angular/common/http';
import {environment} from '../environment/environment';
import { Observable } from 'rxjs/Observable';
import { LoginDetails } from '../DataModels/LoginDetails';
import {Storage} from '@ionic/storage';
const MAP_SERVICE_BASE_URL = new InjectionToken<string>('MapServiceBaseUrl');

@Injectable()
 class AuthService {
    server: Http;
    loginDetails: LoginDetails;
     inValid = "Invalid UserName or Password";
     valid = "validUser";

    constructor(public http: Http,   @Inject(MAP_SERVICE_BASE_URL)
        public MapServiceBaseUrl: string) {
        this.server = http;
    }

    storeUserDetails(value : any){
      var user = JSON.parse(value._body).message;
        //this.storage.set("isLoggedin", true);
        //this.storage.set("userName",user[0].email);
    }

    getUserDetails() 
    {
       // return this.storage.get("userName");
    }

    validateUser(value: any): boolean {
      
        var user = JSON.parse(value._body).message;
        if (user.length != 1) {
            return false;
        }
        else if (user.length == 1) {
            return (user[0].password == this.loginDetails.password) ? true : false;
        }

        //  return 'yes';
    }

    authenticateUser(login: LoginDetails): Observable<any> {

        var uri = environment.dataApiUrl;
        this.loginDetails = login;
        return Observable.create(observer => {
            var endpoint = uri + 'users/' + login.userName;
            this.server.get(endpoint).subscribe((value) => {
                if (this.validateUser(value)){

                    observer.next(true);
                }
                else{
                    observer.next(false);
                }               
                observer.complete();
            },
                err => {
                    observer.error(err);
                    observer.complete();
                })
        }) 
    }
}

export {MAP_SERVICE_BASE_URL,AuthService};