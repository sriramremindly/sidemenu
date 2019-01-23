import { Injectable, Inject, InjectionToken } from '../../node_modules/@angular/core';
import { Http, HttpModule, RequestOptions, Headers } from '../../node_modules/@angular/http';
import { HttpHeaders, HttpResponse } from '../../node_modules/@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs/Observable';
import { LoginDetails } from '../DataModels/LoginDetails';
import { Storage } from '@ionic/Storage';
import { User } from '../DataModels/Users';
import { resolveDefinition } from '@angular/core/src/view/util';
const MAP_SERVICE_BASE_URL = new InjectionToken<string>('MapServiceBaseUrl');

@Injectable()
class AuthService {
    server: Http;
    loginDetails: LoginDetails;
    inValid = "Invalid UserName or Password";
    valid = "validUser";
    user: User;


    constructor(public http: Http, public storage: Storage, @Inject(MAP_SERVICE_BASE_URL) public MapServiceBaseUrl: string) {
        this.server = http;
    }

    storeUserDetails(value: any) {
        var user = JSON.parse(value._body).message;
        //this.storage.set("isLoggedin", true);
        //this.storage.set("userName",user[0].email);
    }

    setUserDetails(user) {
        //this.user = user;
        this.user = new User();
        this.user.email = user.email;
        this.user.userId = user._id;
        let emailProm = this.storage.set('email', user.email);
        let userIdProm = this.storage.set('userId', user._id);

        return new Promise(function (resolve, reject) {
            Promise.all([emailProm, userIdProm]).then(function (values) {

                resolve();
            });

        })
    }

    getUserDetails() {
        let emailProm = this.storage.get('email');
        let userIdProm = this.storage.get('userId');
        let self = this;
        return new Promise(function (resolve, reject) {
            Promise.all([emailProm, userIdProm]).then(function (values) {

                let storedUser = new User();
                storedUser.email = values[0];
                storedUser.userId = values[1];
                self.user = storedUser;
                resolve(storedUser);
            });
        })
    }

    validateUser(value: any): boolean {

        var user = JSON.parse(value._body).message;
        if (user.length != 1) {
            return false;
        }
        else if (user.length == 1) {
            if (user[0].password == this.loginDetails.password) {
                this.setUserDetails(user[0]);
               // this.setUserDetailsMobile(user[0]);
                return true;
            }
            return false;
        }
    }

    DeleteUserSession() {
        this.user = new User();
    }

    setUserDetailsMobile(user): Promise<any> {

        let emailProm = this.storage.set('email', user.email);
        let userIdProm = this.storage.set('userId', user.userId);

        return new Promise(function (resolve, reject) {
            Promise.all([emailProm, userIdProm]).then(function (values) {

                resolve();
            });

        })

    }

    getuserDetailsMobile() {
        let emailProm = this.storage.get('email');
        let userIdProm = this.storage.get('userId');

        return new Promise(function (resolve, reject) {
            Promise.all([emailProm, userIdProm]).then(function (values) {

                let storedUser = new User();
                storedUser.email = values[0];
                storedUser.userId = values[1];
                resolve(storedUser);
            });

        })

    }

    authenticateUser(login: LoginDetails): Observable<any> {

        var uri = environment.dataApiUrl;
        this.loginDetails = login;
        return Observable.create(observer => {
            var endpoint = uri + 'users/' + login.userName;
            this.server.get(endpoint).subscribe((value) => {
                if (this.validateUser(value)) {
                    observer.next(true);
                }
                else {
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

export { MAP_SERVICE_BASE_URL, AuthService };