import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/Products/products';
import {MenuService} from '../DataService/MenuService';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private _menuService: MenuService ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Products', component: ProductsPage }
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
   var title = page.title;
   switch(title){
    case 'Home': {
      this.pages = [
       { title: 'Home', component: HomePage },
       { title: 'Products', component: ListPage }
     ];
     break;
    }
    case 'List': {
      this.pages = [
       { title: 'efgh', component: HomePage },
       { title: 'list', component: ListPage }
     ];
     break;
    }
    case 'Products': {
      this.pages = [
       { title: 'Next Visit', component: HomePage },
       { title: 'Regular List', component: ListPage },
       { title: 'Add Products', component: ListPage }
     ];
     break;
    }
    default:{
      this.pages = [
       { title: 'abcd', component: HomePage },
       { title: 'list', component: ListPage }
     ];
     break;
    }
   }
    this.nav.setRoot(page.component);
   // this._menuService.getMenuItems();
  }
}
