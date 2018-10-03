import { Component, OnInit } from '@angular/core';
import { NavController, ModalController,LoadingController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {GroupService} from '../../DataService/GroupsService';
import {GroupProductService} from '../../DataService/GroupProductsService';
import {GroupProduct} from '../../DataModels/GroupProducts';



@Component({
  selector: 'page-Groupproducts',
  templateUrl: 'GroupProductsPage.html',
  styles:['GroupProducts.scss']
})
export class GroupProductsPage  implements OnInit{
  rootPage: any = ListPage;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Array<any>;
 updateMsg:string;
 groupId:string;
 showMsg:boolean= false;
 loader:any;
  constructor(public navCtrl: NavController, public groupService: GroupService,
    public groupProductService: GroupProductService,public loadingCtrl: LoadingController) {     
   this.groupId = this.groupService.groupId;
  }

  public ngOnInit()
  {
    var groupId = this.groupId;
    this.groupProductService.getProductsListapi(groupId).subscribe((value) =>{
      let data = JSON.parse(value._body);
      let obj = data.message;
       this.products = obj.map(val => {
          var nextvisit = val.nextVisit== 1 ? true: false;
            return {productName:val.productName,nextVisit:nextvisit,groupProdId:val._id,groupId:val.groupId}; 
        })
      })  
  }

  public updateItem(groupProduct:GroupProduct) { 
    this.showMsg = false;
    this.createLoadingCtrl("Please wait while trying to update Product for next visit");
    groupProduct.groupId = this.groupId;
  this.groupProductService.updateProductapi(groupProduct).subscribe((value)=> { 
    this.dismissLoader();
    if(groupProduct.nextVisit)
  {
    this.displayMsg( "Product has been added to next visit succesfully");
  }
  else{
    this.displayMsg("Product has been removed from next visit succesfully");
  }
},
err => {
  this.dismissLoader();
  if(groupProduct.nextVisit)
  {
    this.displayMsg("Error in adding the product to next visit");
    groupProduct.nextVisit = 'false';
  }
  else{
    this.displayMsg("Error in removing the product from next visit");
    groupProduct.nextVisit = 'true';
  }
})

  }

 public DeleteItem(groupProduct : GroupProduct)
 {
   this.showMsg = false;
   this.createLoadingCtrl("Please wait while trying to add Product to next visit");
  var prodId = groupProduct.groupProdId;
  var prodIndex = this.products.indexOf(groupProduct);
  this.groupProductService.deleteProductapi(prodId).subscribe((val)=> {
    if (prodIndex >-1)
    this.products.splice(prodIndex,1); 
    this.displayMsg("Product has been deleted succesfully"); 
    this.dismissLoader();
  },
 err => {
  this.displayMsg("Error in deleting the Product");  
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
