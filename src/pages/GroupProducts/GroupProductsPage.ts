import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {GroupService} from '../../DataService/GroupsService';
import {GroupProductService} from '../../DataService/GroupProductsService';
import {GroupProduct} from '../../DataModels/GroupProducts';



@Component({
  selector: 'page-Groupproducts',
  templateUrl: 'GroupProductsPage.html',
  styleUrls:['/pages/GroupProducts/GroupProducts.scss']
})
export class GroupProductsPage  implements OnInit{
  rootPage: any = ListPage;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Array<any>;
 updateMsg:string;
 groupId:string;
  constructor(public navCtrl: NavController, public groupService: GroupService,
    public groupProductService: GroupProductService) {     
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
    groupProduct.groupId = this.groupId;
  this.groupProductService.updateProductapi(groupProduct).subscribe((value)=> { 
  if(groupProduct.nextVisit)
  {
    this.updateMsg = "Product has been added to next visit succesfully";
  }
  else{
    this.updateMsg = "Product has been removed from next visit succesfully";
  }
},
err => {
  if(groupProduct.nextVisit)
  {
    this.updateMsg = "Error in adding the product to next visit";
    groupProduct.nextVisit = 'false';
  }
  else{
    this.updateMsg = "Error in removing the product from next visit";
    groupProduct.nextVisit = 'true';
  }
})

  }

 public DeleteItem(groupProduct : GroupProduct)
 {
  var prodId = groupProduct.groupProdId;
  var prodIndex = this.products.indexOf(groupProduct);
  this.groupProductService.deleteProductapi(prodId).subscribe((val)=> {
    if (prodIndex >-1)
    this.products.splice(prodIndex,1); 
  },
 err => {
 })
 }
}
