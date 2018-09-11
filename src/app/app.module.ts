import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/Products/products';
import {AddProductsPage} from '../pages/AddProducts/AddProducts';
import {NextVisitPage} from '../pages/NextVisit/NextVisit';
import {DeleteModalPage} from '../pages/Modals/DeleteModal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MenuService} from '../DataService/MenuService';
import {ProductService} from '../DataService/ProductService';
import {HttpModule} from '../../node_modules/@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    AddProductsPage,
    NextVisitPage,
    DeleteModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    AddProductsPage,
    NextVisitPage,
    DeleteModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: MenuService, useClass: MenuService},
    {provide:ProductService,useClass:ProductService}
  ]
})
export class AppModule {}
