import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import {ProductService} from '../../DataService/ProductService';
import { Observable } from 'rxjs/Observable';
import {Product} from '../../DataModels/Products';


@Component({
  selector: 'page-AddProducts',
  templateUrl: 'AddProducts.html',
  styleUrls:['/pages/AddProduct/Addproducts.scss']
})
export class AddProductsPage  implements OnInit{
  rootPage: any = ListPage;
  productName: string;
  submitMsg: string;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Observable<Array<any>>;
  constructor(public navCtrl: NavController,public productService:ProductService) {     
            
  }

  public ngOnInit()
  {
  //  this.productService.getProductsList().subscribe((value) =>{
    //  let obj = JSON.parse(value._body);
     //  this.products = obj.map(val => {
        //  var nextvisit = val.nextVisit== 1 ? true: false;
        //    return {name:val.name,nextVisit:nextvisit}; 
       // })
      /// })  
  }

  public AddNewProduct()
  {
  let prod = new Product();
  prod.productName = this.productName;
  prod.nextVisit = '0';
    this.productService.addProductapi(prod).subscribe((value)=>{         
      let obj = JSON.parse(value._body);
      this.submitMsg = "Product has been added successfully";
    },
    err => {
      let msg = err._body;
      if (msg.includes("duplicate key found")){
      this.submitMsg = "Error in adding the product";
     }        
    }
  );
  }
}
