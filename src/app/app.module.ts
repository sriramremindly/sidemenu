import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {IonicStorageModule,Storage} from '@ionic/Storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/Products/products';
import {AddProductsPage} from '../pages/AddProducts/AddProducts';
import {NextVisitPage} from '../pages/NextVisit/NextVisit';
import {DeleteModalPage} from '../pages/Modals/DeleteModal';
import {LoginPage} from '../pages/Login/LoginPage';
import {SignUpPage} from '../pages/SignUp/SignUpPage';
import {SplashPage} from '../pages/Splash/SplashPage';
import {AddGroupsPage} from '../pages/AddGroups/AddGroups';
import {GroupUserspage} from '../pages/GroupUsers/GroupUsers';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MenuService} from '../DataService/MenuService';
import {ProductService} from '../DataService/ProductService';
import {GroupService} from '../DataService/GroupsService';
import {UserService} from '../DataService/UsersService';
import {HttpModule, Http} from '../../node_modules/@angular/http';
import {AuthService ,MAP_SERVICE_BASE_URL} from '../DataService/AuthService';
import {Groupspage} from '../pages/Groups/GroupsPage';
import {environment} from '../environment/environment';
import {AddGroupProductsPage} from '../pages/AddGroupProducts/AddGroupProducts';
import {GroupNextVisitPage} from '../pages/GroupNextVisit/GroupNextVisit';
import {GroupProductsPage} from '../pages/GroupProducts/GroupProductsPage';
import {GroupProductService} from '../DataService/GroupProductsService';
import {UserGroupService} from '../DataService/UserGroupService';
import {LogOutPage} from '../pages/LogOut/LogOutPage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    AddProductsPage,
    NextVisitPage,
    DeleteModalPage,
    LoginPage,
    SignUpPage,
    SplashPage,
    Groupspage,
    AddGroupsPage,
    GroupUserspage,
    AddGroupProductsPage,
    GroupNextVisitPage,
    GroupProductsPage,
    LogOutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    AddProductsPage,
    NextVisitPage,
    DeleteModalPage,
    LoginPage,
    SignUpPage,
    SplashPage,
    Groupspage,
    AddGroupsPage,
    GroupUserspage,
    AddGroupProductsPage,
    GroupNextVisitPage,
    GroupProductsPage,
    LogOutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: MenuService, useClass: MenuService},
    {provide:ProductService,useClass:ProductService},
    {provide:UserService,useClass:UserService},      
    {provide: MAP_SERVICE_BASE_URL, useFactory : ()=> {
      return environment.dataApiUrl
    }},
    {provide:AuthService,useClass:AuthService,
    deps:[Http,Storage,MAP_SERVICE_BASE_URL]},
    {provide:GroupService,useClass:GroupService},
    {provide:GroupProductService,useClass:GroupProductService},
    {provide:UserGroupService,useClass:UserGroupService}      
  ]
})
export class AppModule {}
