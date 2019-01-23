import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/Login/LoginPage';
import { HomePage } from '../pages/home/home';
import { ProductsPage } from '../pages/Products/products';
import { MenuService } from '../DataService/MenuService';
import { AddProductsPage } from '../pages/AddProducts/AddProducts';
import { NextVisitPage } from '../pages/NextVisit/NextVisit';
import { AuthService } from '../DataService/AuthService';
import {Groupspage} from '../pages/Groups/GroupsPage';
import {AddGroupsPage} from '../pages/AddGroups/AddGroups';
import {GroupUserspage} from '../pages/GroupUsers/GroupUsers';
import {GroupProductsPage} from '../pages/GroupProducts/GroupProductsPage';
import {GroupNextVisitPage} from '../pages/GroupNextVisit/GroupNextVisit';
import {AddGroupProductsPage} from '../pages/AddGroupProducts/AddGroupProducts';
import {LogOutPage} from '../pages/LogOut/LogOutPage';
import {SplashPage} from '../pages/Splash/SplashPage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //rootPage: any = HomePage;
  rootPage: any = SplashPage;

  pages: Array<{ title: string, component: any, value: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private _menuService: MenuService, public authService: AuthService,
    public menuService: MenuService) {
      
      this.menuService.LoginPageSelected.subscribe(()=> {
    this.nav.setRoot(LoginPage);
      }, 
      err => {

      });

      this.menuService.groupsSelected.subscribe((group)=> {
        this.displayGroupsPage(group);
      },
      err => {

      });
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
      { title: 'Products', component: ProductsPage, value: 'Products' },
      {title : 'Logout', component:LogOutPage,value: 'Logout'}
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
          {title:'Groups', component:Groupspage, value: 'Groups'},
          { title: 'Products', component: ProductsPage, value: 'Products' },
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
        ];
        break;
      }
      case 'Products': {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' },
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
        ];
        break;
      }
      case 'Groups': {
         this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Add New Group', component: AddGroupsPage, value: 'NewGroup' },
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
         ];
         break;
      }
      case 'Addproducts': {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' },
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
        ];
        break;
      }
      case 'RegularVisit': {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' },
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
        ];
        break;
      }
      case 'NextVisit': {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Next Visit', component: NextVisitPage, value: 'NextVisit' },
          { title: 'Regular List', component: ProductsPage, value: 'RegularVisit' },
          { title: 'Add Products', component: AddProductsPage, value: 'Addproducts' },
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
        ];
        break;
      }
      case 'NewGroup' : {
         this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          {title:'Groups', component:Groupspage, value: 'Groups'},
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
         ]
        break;
      }
      case 'GroupProducts' : {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          {title:'Groups', component:Groupspage, value: 'Groups'},
          { title: 'Next Visit', component: GroupNextVisitPage, value: 'GroupNextVisit' },
          {title:'Regular List', component:GroupProductsPage, value: 'GroupRegularVisit'},
          {title:'Add Products', component:AddGroupProductsPage, value: 'AddGroupproducts'},
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
         ]
        break;
      }
      case 'GroupNextVisit' : {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          {title:'Groups', component:Groupspage, value: 'Groups'},
          { title: 'Next Visit', component: GroupNextVisitPage, value: 'GroupNextVisit' },
          {title:'Regular List', component:GroupProductsPage, value: 'GroupRegularVisit'},
          {title:'Add Products', component:AddGroupProductsPage, value: 'AddGroupproducts'},
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
         ]
        break;
      }
      case 'GroupRegularVisit' : {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          {title:'Groups', component:Groupspage, value: 'Groups'},
          { title: 'Next Visit', component: GroupNextVisitPage, value: 'GroupNextVisit' },
          {title:'Regular List', component:GroupProductsPage, value: 'GroupRegularVisit'},
          {title:'Add Products', component:AddGroupProductsPage, value: 'AddGroupproducts'},
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
         ]
        break;
      }
      case 'AddGroupproducts' : {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          {title:'Groups', component:Groupspage, value: 'Groups'},
          { title: 'Next Visit', component: GroupNextVisitPage, value: 'GroupNextVisit' },
          {title:'Regular List', component:GroupProductsPage, value: 'GroupRegularVisit'},
          {title:'Add Products', component:AddGroupProductsPage, value: 'AddGroupproducts'},
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
         ]
        break;
      }
      default: {
        this.pages = [
          { title: 'Home', component: HomePage, value: 'Home' },
          { title: 'Products', component: ProductsPage, value: 'Products' },
          {title : 'Logout', component:LogOutPage,value: 'Logout'}
        ];
        break;
      }
    }
    this.nav.setRoot(page.component);
  }

  displayGroupsPage(group:any){
    this.pages = [
      { title: 'Home', component: HomePage, value: 'Home' },
      {title:'Groups', component:Groupspage, value: 'Groups'},
      { title: 'Group Products', component: GroupProductsPage, value: 'GroupProducts' },
      {title : 'Logout', component:LogOutPage,value: 'Logout'}
    ]
    this.nav.setRoot(GroupUserspage,{groupId:group.groupId});
  }

}
