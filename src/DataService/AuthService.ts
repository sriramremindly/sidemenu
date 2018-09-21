import { Injectable, EventEmitter } from '../../node_modules/@angular/core';
import { Http, HttpModule, RequestOptions, Headers } from '../../node_modules/@angular/http';
import { HttpHeaders, HttpResponse } from '../../node_modules/@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginDetails } from '../DataModels/LoginDetails';
import {Storage} from '@ionic/storage';

@Injectable()
export class AuthService {
    server: Http;
    loginDetails: LoginDetails;
     inValid = "Invalid UserName or Password";
     valid = "validUser";

    constructor(private http: Http, public storage: Storage) {
        this.server = http;
    }

    storeUserDetails(value : any){
        var user = JSON.parse(value._body).message;
        this.storage.set("isLoggedin", true);
        this.storage.set("userName",user[0].email);
    }

    getUserDetails() 
    {
        return this.storage.get("userName");
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

        this.loginDetails = login;
        return Observable.create(observer => {
            var url = 'https://remindly.herokuapp.com/users/' + login.userName;
            this.server.get(url).subscribe((value) => {
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