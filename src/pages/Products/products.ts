import { Component, OnInit } from '@angular/core';
import { NavController, ModalController,LoadingController } from 'ionic-angular';
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
 showMsg:boolean= false;
 loader:any;
  constructor(public navCtrl: NavController,public productService:ProductService,
    public modalctrl: ModalController, public authService:AuthService,
    public loadingCtrl: LoadingController) {     
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
    this.showMsg = false;
    this.createLoadingCtrl("Please wait while trying to update product for next visit");
    product.userId = this.user.userId;
  this.productService.updateProductapi(product).subscribe((value)=> { 
    this.dismissLoader();
    if(product.nextVisit)
  {
    this.displayMsg( "Product has been added to next visit succesfully");
  }
  else{
    this.displayMsg("Product has been removed from next visit succesfully");
  }
},
err => {
  this.dismissLoader();
  if(product.nextVisit)
  {
    this.displayMsg("Error in adding the product to next visit");
    product.nextVisit = 'false';
  }
  else{
    this.displayMsg("Error in removing the product from next visit");
    product.nextVisit = 'true';
  }
})

  }

 public DeleteItem(product : Product)
 {
   this.showMsg = false;
   this.createLoadingCtrl("Please wait while trying to delete product");
  var prodId = product.prodId;
  var prodIndex = this.products.indexOf(product);
  this.productService.deleteProductapi(prodId).subscribe((val)=> {
    if (prodIndex >-1)
    this.products.splice(prodIndex,1); 

    this.displayMsg("Error in deleting the Product"); 
    this.dismissLoader();
  },
 err => {
  this.displayMsg("Product has been deleted succesfully"); 
  this.dismissLoader();
 })
 }

 public displayMsg(msg)
 {
  this.showMsg = true;
  this.updateMsg = msg;
 }

 public createLoadingCtrl(msg)
 {
     this.loader = this.loadingCtrl.create({
      content: msg
     }
   )
   this.loader.present();
 }

 public dismissLoader()
 {
     this.loader.dismiss();
 }

}
