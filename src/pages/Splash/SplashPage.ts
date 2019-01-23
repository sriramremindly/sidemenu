import {Component} from '@angular/core';
import {AuthService} from '../../DataService/AuthService';
import {HomePage} from '../home/home';
import {LoginPage} from '../Login/LoginPage';
import {NavController} from 'ionic-angular';
import {Storage} from '@ionic/Storage';
import { User } from '../../DataModels/Users';

@Component({
    selector: 'page-splash',
    templateUrl: 'SplashPage.html',
    styles:['SplashPage.scss']
})
export class SplashPage{

    constructor(public authService: AuthService,public navCtrl: NavController,public storage:Storage)
    {

    }

    ionViewDidLoad()
    {
 
      var self = this;
      this.authService.getuserDetailsMobile().then((user:User) =>{
        if (user.email) {
             self.authService.setUserDetailsMobile(user);
             this.navCtrl.setRoot(HomePage);
           }
           else {
             this.navCtrl.setRoot(LoginPage);
           }
         }, function (err) {
           this.navCtrl.setRoot(LoginPage);
         }) 
 
    }
}
