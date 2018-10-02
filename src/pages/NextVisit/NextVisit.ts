import { Component, OnInit } from '@angular/core';
import { NavController, Icon } from 'ionic-angular';
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
  user:User;
 // products: Array<{name:string,nextVisit:Number}> ;
 products: Array<any>;
  constructor(public navCtrl: NavController,public productService:ProductService,
    public authService:AuthService) {     
    this.user = this.authService.getUserDetails();
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
    var userId = this.user.userId;
    var prodid = product._id;
   var prodIndex = this.products.indexOf(product);
          
    let productToUpdate = {productName : product.productName, nextVisit : false, prodId:prodid,userId:userId};
    this.productService.updateProductapi(productToUpdate).subscribe((val)=> {
   if (prodIndex >-1)
      this.products.splice(prodIndex,1); 
    },
   err => {
   }) 
  }

}
