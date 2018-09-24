import {Component} from '@angular/core';
import {AuthService} from '../../DataService/AuthService';
import {HomePage} from '../home/home';
import {LoginPage} from '../Login/LoginPage';

@Component({
    selector: 'page-splash',
    templateUrl: 'SplashPage.html',
    styleUrls:['/pages/Splash/SplashPage.scss']
})
export class SplashPage{

    constructor(public authService: AuthService)
    {

    }

    ionViewDidLoad()
    {
      /*  this.authService.getUserDetails().then(function (val) {
            if (val) {
              this.nav.setRoot(HomePage);
            }
            else {
              this.nav.setRoot(LoginPage);
            }
          }, function (err) {
            this.nav.setRoot(LoginPage);
          }) */
    }
}
