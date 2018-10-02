import { Component, OnInit } from '@angular/core';
import { NavController, Icon } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import {GroupProductService} from '../../DataService/GroupProductsService';
import {GroupService} from '../../DataService/GroupsService';
import { Observable } from 'rxjs/Observable';
import {Product} from '../../DataModels/Products';



@Component({
  selector: 'page-GroupNextVisit',
  templateUrl: 'GroupNextVisit.html',
  styles:['GroupNextVisit.scss']
})
export class GroupNextVisitPage  implements OnInit{
  rootPage: any = ListPage;
  groupId: string;
 // products: Array<{name:string,nextVisit:Number}> ;
 products: Array<any>;
  constructor(public navCtrl: NavController,public groupProductService:GroupProductService,
    public groupService:GroupService) {     
         this.groupId =  this.groupService.groupId; 
  }

  public ngOnInit()
  {
    var groupId = this.groupId;
    this.groupProductService.getProductsListapi(groupId).subscribe((value) =>{
      let data = JSON.parse(value._body);
      let obj = data.message;
       this.products = obj.filter(val => {
          var nextvisit = val.nextVisit== 1 ? true: false;
          if(nextvisit)
            return {productName:val.productName,nextVisit:nextvisit,groupProdId:val._id,groupId:val.groupId}; 
        })
      })  
  }

  public DeleteItem(product : any)
  {
    var groupProdid = product._id;
   var prodIndex = this.products.indexOf(product);
          
    let productToUpdate = {productName : product.productName, nextVisit : false,
       groupId:product.groupId,groupProdId:groupProdid};
    this.groupProductService.updateProductapi(productToUpdate).subscribe((val)=> {
   if (prodIndex >-1)
      this.products.splice(prodIndex,1); 
    },
   err => {
   })
 
  }

}
