import { Component} from '@angular/core';
import { AuthService } from '../../DataService/AuthService';
import {MenuService} from '../../DataService/MenuService';



@Component({
    selector: 'page-LogOut',
    templateUrl: 'LogOutPage.html',
    styles: ['/GroupsPage.scss']
})
export class LogOutPage {

constructor(public authService: AuthService, public menuService: MenuService){
this.authService.DeleteUserSession();
}

public GoToLogin() {

    this.menuService.LoginPageSelected.emit();
}

}