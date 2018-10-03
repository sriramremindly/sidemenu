import { Component, OnInit } from '@angular/core';
import { NavController, Icon,LoadingController } from 'ionic-angular';
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
  updateMsg:string;
  groupId: string;
  showMsg:boolean= false;
  loader:any;
  products: Array<any>;
  constructor(public navCtrl: NavController,public groupProductService:GroupProductService,
    public groupService:GroupService,public loadingCtrl: LoadingController) {     
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
    this.showMsg = false;
    this.createLoadingCtrl();
    var groupProdid = product._id;
   var prodIndex = this.products.indexOf(product);
          
    let productToUpdate = {productName : product.productName, nextVisit : false,
       groupId:product.groupId,groupProdId:groupProdid};
    this.groupProductService.updateProductapi(productToUpdate).subscribe((val)=> {
   if (prodIndex >-1)
      this.products.splice(prodIndex,1); 
      this.displayMsg("Product has been deleted succesfully from next visit"); 
      this.dismissLoader();
    },
   err => {
    this.displayMsg("Error in deleting the Product from next visit"); 
    this.dismissLoader();
  })
 
  }

  public displayMsg(msg)
  {
   this.showMsg = true;
   this.updateMsg = msg;
  }

  public createLoadingCtrl()
  {
      this.loader = this.loadingCtrl.create({
       content: "Please wait while trying to remove product from next visit"
      }
    )
    this.loader.present();
  }
 
  public dismissLoader()
  {
      this.loader.dismiss();
  }

}
