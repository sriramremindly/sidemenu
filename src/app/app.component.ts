import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/Login/LoginPage';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignUpPage } from '../pages/SignUp/SignUpPage';
import { ProductsPage } from '../pages/Products/products';
import { MenuService } from '../DataService/MenuService';
import { AddProductsPage } from '../pages/AddProducts/AddProducts';
import { NextVisitPage } from '../pages/NextVisit/NextVisit';
import { AuthService } from '../DataService/AuthService';
import {SplashPage} from '../pages/Splash/SplashPage';
import {Groupspage} from '../pages/Groups/GroupsPage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, value: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private _menuService: MenuService, public authService: AuthService) {
   // this.nav.setRoot(HomePage);
      /*this.authService.getUserDetails().then(function (val) {
      if (val) {
        this.nav.setRoot(HomePage);
      }
      else {
        this.nav.setRoot(LoginPage);
      }
    }, function (err) {
      this.nav.setRoot(LoginPage);
    }) */
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, value: 'Home' },
      {title:'Groups', component:Groupspage, value: 'Groups'},
      { title: 'Products', component: ProductsPage, value: 'Products' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page.title);
    var title = page.value;
    switch (title) {
      case 'Home': {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Products', component: ProductsPage, value: 'Products' }
        ];
        break;
      }
      case 'Products': {
        this.pages = [
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' }
        ];
        break;
      }
      case 'Groups': {
         this.pages = [
          { title: 'Home', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Groups', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Group Products', component: AddProductsPage, value: 'Addproducts' }
         ];
         break;
      }
      case 'Addproducts': {
        this.pages = [
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' }
        ];
        break;
      }
      case 'RegularVisit': {
        this.pages = [
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' }
        ];
        break;
      }
      case 'NextVisit': {
        this.pages = [
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' }
        ];
        break;
      }
      default: {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Products', component: ProductsPage, value: 'Products' }
        ];
        break;
      }
    }
    this.nav.setRoot(page.component);
  }
}
