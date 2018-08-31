import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import {ProductService} from '../../DataService/ProductService';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  styleUrls:['/pages/Products/products.scss']
})
export class ProductsPage  implements OnInit{
  rootPage: any = ListPage;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Observable<Array<any>>;
  constructor(public navCtrl: NavController,public productService:ProductService) {     
            
  }

  public ngOnInit()
  {
    this.productService.getProductsList().subscribe((value) =>{
      let obj = JSON.parse(value._body);
       this.products = obj.map(val => {
          var nextvisit = val.nextVisit== 1 ? true: false;
            return {name:val.name,nextVisit:nextvisit}; 
        })
        })  

  }

}
