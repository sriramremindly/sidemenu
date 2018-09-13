import { Component, OnInit } from '@angular/core';
import { NavController, Icon } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import {ProductService} from '../../DataService/ProductService';
import { Observable } from 'rxjs/Observable';
import {Product} from '../../DataModels/Products';



@Component({
  selector: 'page-NextVisit',
  templateUrl: 'NextVisit.html',
  styleUrls:['NextVisit.scss']
})
export class NextVisitPage  implements OnInit{
  rootPage: any = ListPage;
 // products: Array<{name:string,nextVisit:Number}> ;
 products: Array<any>;
  constructor(public navCtrl: NavController,public productService:ProductService) {     
            
  }

  public ngOnInit()
  {
    this.productService.getProductsList().subscribe((value) =>{
      let obj = JSON.parse(value._body);
       this.products = obj.filter(val => {
          var nextvisit = val.nextVisit== 1 ? true: false;
          if(nextvisit)
            return {productName:val.productName,nextVisit:nextvisit,userId:val._id.$oid}; 
        })
      })  
  }

  public DeleteItem(product : any)
  {
    var userid = product._id.$oid;
   var prodIndex = this.products.indexOf(product);
          
    let productToUpdate = {productName : product.productName, nextVisit : false, userId:userid};
    this.productService.updateProduct(productToUpdate).subscribe((val)=> {
   if (prodIndex >-1)
      this.products.splice(prodIndex,1); 
    },
   err => {
   })
 
  }

}
