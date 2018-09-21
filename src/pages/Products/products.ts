import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import {DeleteModalPage} from '../Modals/DeleteModal';
import {ProductService} from '../../DataService/ProductService';
import { Observable } from 'rxjs/Observable';
import {Product} from '../../DataModels/Products';


@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  styleUrls:['/pages/Products/products.scss']
})
export class ProductsPage  implements OnInit{
  rootPage: any = ListPage;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Array<any>;
 updateMsg:string;
  constructor(public navCtrl: NavController,public productService:ProductService,
    public modalctrl: ModalController) {     
            
  }

  public ngOnInit()
  {
    this.productService.getProductsListapi().subscribe((value) =>{
      let data = JSON.parse(value._body);
      let obj = data.message;
       this.products = obj.map(val => {
          var nextvisit = val.nextVisit== 1 ? true: false;
            return {productName:val.productName,nextVisit:nextvisit,userId:val._id}; 
        })
      })  
  }

  public updateItem(product:Product) { 
  this.productService.updateProductapi(product).subscribe((value)=> { 
  if(product.nextVisit)
  {
    this.updateMsg = "Product has been added to next visit succesfully";
  }
  else{
    this.updateMsg = "Product has been removed from next visit succesfully";
  }
},
err => {
  if(product.nextVisit)
  {
    this.updateMsg = "Error in adding the product to next visit";
    product.nextVisit = 'false';
  }
  else{
    this.updateMsg = "Error in removing the product from next visit";
    product.nextVisit = 'true';
  }
})

  }

 public DeleteItem(product : Product)
 {
  var userid = product.userId;
  var prodIndex = this.products.indexOf(product);
  this.productService.deleteProductapi(userid).subscribe((val)=> {
    if (prodIndex >-1)
    this.products.splice(prodIndex,1); 
  },
 err => {
 })
 }
}
