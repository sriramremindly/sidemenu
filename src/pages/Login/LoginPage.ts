import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { App, ViewController, NavController } from 'ionic-angular';
import { SignUpPage } from '../SignUp/SignUpPage';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../DataService/AuthService';
import { LoginDetails } from '../../DataModels/LoginDetails';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-Login',
    templateUrl: 'LoginPage.html',
    styleUrls: ['/pages/Login/LoginPage.scss']
})
export class LoginPage {
    server: Http;
    login_Form: FormGroup;
    loginDetails: LoginDetails;
    showErrorMsg: boolean = false;

    constructor(private http: Http, public viewCtrl: ViewController, public appCtrl: App,
        public navCtrl: NavController, public formBuilder: FormBuilder, public authService: AuthService) {
        this.server = http;
    }

    ionViewWillLoad() {
        this.login_Form = this.formBuilder.group({
            userName: new FormControl('', Validators.required),
            Password: new FormControl('', Validators.required)
        })
    }

    SignUP() {
        this.navCtrl.setRoot(SignUpPage);
    }

    onSubmit(values) {
        this.showErrorMsg = false;
        this.loginDetails = new LoginDetails();
        this.loginDetails.userName = values.userName;
        this.loginDetails.password = values.Password;
        this.authService.authenticateUser(this.loginDetails).subscribe((value) => {
            if (value) {
                this.navCtrl.setRoot(HomePage);
            }
            else {
                this.showErrorMsg = true;
            }
        },
            err => {
                console.log(err);
            });
    }
}
