import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {
  rootPage: any = ListPage;
  constructor(public navCtrl: NavController) {

  }

}
