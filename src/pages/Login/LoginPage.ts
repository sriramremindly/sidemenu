import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { App, ViewController, NavController,LoadingController } from 'ionic-angular';
import { SignUpPage } from '../SignUp/SignUpPage';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../DataService/AuthService';
import { LoginDetails } from '../../DataModels/LoginDetails';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-Login',
    templateUrl: 'LoginPage.html',
    styles: ['LoginPage.scss']
})
export class LoginPage {
    server: Http;
    login_Form: FormGroup;
    loginDetails: LoginDetails;
    showErrorMsg: boolean = false;
    loader:any;


    constructor(private http: Http, public viewCtrl: ViewController, public appCtrl: App,
        public navCtrl: NavController, public formBuilder: FormBuilder, public authService: AuthService,
        public loadingCtrl: LoadingController) {
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
        this.login_Form.controls.userName
        console.log(this.login_Form.controls.userName);
        if (this.login_Form.valid)
        {
      this.createLoadingCtrl();
        this.showErrorMsg = false;
        this.loginDetails = new LoginDetails();
        this.loginDetails.userName = values.userName;
        this.loginDetails.password = values.Password;
        this.authService.authenticateUser(this.loginDetails).subscribe((value) => {
           this.dismissLoader();
            if (value) {
                this.navCtrl.setRoot(HomePage);
            }
            else {
                this.showErrorMsg = true;
            }
        },
            err => {
                this.dismissLoader();
                console.log(err);
            });
        }
    }

    public createLoadingCtrl()
    {
        this.loader = this.loadingCtrl.create({
         content: "Please wait while trying to authenticate"
        }
      )
      this.loader.present();
    }

    public dismissLoader()
    {
        this.loader.dismiss();
    }
}
