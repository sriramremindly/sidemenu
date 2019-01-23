import { Component, OnInit } from '@angular/core';
import { NavController, Icon, LoadingController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {ProductService} from '../../DataService/ProductService';
import {AuthService} from '../../DataService/AuthService';
import {User} from '../../DataModels/Users';



@Component({
  selector: 'page-NextVisit',
  templateUrl: 'NextVisit.html',
  styles:['NextVisit.scss']
})
export class NextVisitPage  implements OnInit{
  rootPage: any = ListPage;
  updateMsg:string;
  user:User;
  showMsg:boolean= false;
  loader:any;
 products: Array<any>;
  constructor(public navCtrl: NavController,public productService:ProductService,
    public authService:AuthService,public loadingCtrl: LoadingController) {     
    this.user = this.authService.user;
  }

  public ngOnInit()
  {
    var userId = this.user.userId;
    this.productService.getProductsListapi(userId).subscribe((value) =>{
      let data = JSON.parse(value._body);
      let obj = data.message;
       this.products = obj.filter(val => {
          var nextvisit = val.nextVisit== 1 ? true: false;
          if(nextvisit)
            return {productName:val.productName,nextVisit:nextvisit,prodId:val._id,userId:val.userId}; 
        })
      })  
  }

  public DeleteItem(product : any)
  {
    this.showMsg = false;
    this.createLoadingCtrl();
    var userId = this.user.userId;
    var prodid = product._id;
   var prodIndex = this.products.indexOf(product);
          
    let productToUpdate = {productName : product.productName, nextVisit : false, prodId:prodid,userId:userId};
    this.productService.updateProductapi(productToUpdate).subscribe((val)=> {
   if (prodIndex >-1)
      this.products.splice(prodIndex,1); 
      this.displayMsg("Product has been deleted from next visit successfully");
      this.dismissLoader();
    },
   err => {
    this.displayMsg("Error in deleting the product successfully");
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
       content: "Please wait while trying to delete product from next visit"
      }
    )
    this.loader.present();
  }
 
  public dismissLoader()
  {
      this.loader.dismiss();
  }

}
