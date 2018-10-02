import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {ProductService} from '../../DataService/ProductService';
import {GroupService} from '../../DataService/GroupsService';
import {AuthService} from '../../DataService/AuthService';
import {Product} from '../../DataModels/Products';
import { User } from '../../DataModels/Users';



@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
  styles:['products.scss']
})
export class ProductsPage  implements OnInit{
  rootPage: any = ListPage;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Array<any>;
 updateMsg:string;
 user:User;
  constructor(public navCtrl: NavController,public productService:ProductService,
    public modalctrl: ModalController, public authService:AuthService) {     
   this.user = this.authService.getUserDetails();
  }

  public ngOnInit()
  {
    var userId = this.user.userId;
    this.productService.getProductsListapi(userId).subscribe((value) =>{
      let data = JSON.parse(value._body);
      let obj = data.message;
       this.products = obj.map(val => {
          var nextvisit = val.nextVisit== 1 ? true: false;
            return {productName:val.productName,nextVisit:nextvisit,prodId:val._id,userId:val.userId}; 
        })
      })  
  }

  public updateItem(product:Product) { 
    product.userId = this.user.userId;
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
  var prodId = product.prodId;
  var prodIndex = this.products.indexOf(product);
  this.productService.deleteProductapi(prodId).subscribe((val)=> {
    if (prodIndex >-1)
    this.products.splice(prodIndex,1); 
  },
 err => {
 })
 }
}
