import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {ProductService} from '../../DataService/ProductService';
import { Observable } from 'rxjs/Observable';
import {Product} from '../../DataModels/Products';
import {AuthService} from '../../DataService/AuthService';
import {User} from '../../DataModels/Users';


@Component({
  selector: 'page-AddProducts',
  templateUrl: 'AddProducts.html',
  styles:['Addproducts.scss']
})
export class AddProductsPage  implements OnInit{
  rootPage: any = ListPage;
  productName: string;
  submitMsg: string;
  user: User;
  showMsg:boolean = false;
  loader:any;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Observable<Array<any>>;
  constructor(public navCtrl: NavController,public productService:ProductService,
              public authService: AuthService,public loadingCtrl: LoadingController) {     
   this.user = this.authService.getUserDetails();         
  }

  public ngOnInit()
  {

  }

  public AddNewProduct()
  {
    this.showMsg = false;
    this.createLoadingCtrl();
    var userId = this.user.userId;
  let prod = new Product();
  prod.productName = this.productName;
  prod.nextVisit = '0';
  prod.userId = userId;
    this.productService.addProductapi(prod).subscribe((value)=>{         
      let obj = JSON.parse(value._body);
      this.displayMsg("Product has been added successfully");
      this.dismissLoader();
    },
    err => {
      let msg = err._body;
      if (msg.includes("duplicate key found")){
      this.displayMsg("Error in adding the product");
      this.dismissLoader();
     }        
    }
  );
  }

  public displayMsg(msg)
  {
   this.showMsg = true;
   this.submitMsg = msg;
  }
  public createLoadingCtrl()
  {
      this.loader = this.loadingCtrl.create({
       content: "Please wait while trying to add a product"
      }
    )
    this.loader.present();
  }
 
  public dismissLoader()
  {
      this.loader.dismiss();
  }
}
