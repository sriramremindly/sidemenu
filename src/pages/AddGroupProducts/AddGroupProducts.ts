import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {GroupProductService} from '../../DataService/GroupProductsService';
import { Observable } from 'rxjs/Observable';
import {GroupProduct} from '../../DataModels/GroupProducts';
import {GroupService} from '../../DataService/GroupsService';
import {User} from '../../DataModels/Users';


@Component({
  selector: 'page-AddGroupProducts',
  templateUrl: 'AddGroupProducts.html',
  styles:['AddGroupProducts.scss']
})
export class AddGroupProductsPage  implements OnInit{
  rootPage: any = ListPage;
  productName: string;
  submitMsg: string;
  groupId: string;
  showMsg:boolean = false;
  loader:any;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Observable<Array<any>>;
  constructor(public navCtrl: NavController,public groupProductService:GroupProductService,
              public groupService: GroupService,public loadingCtrl: LoadingController) {     
     this.groupId = this.groupService.groupId;  
  }

  public ngOnInit()
  {

  }

  public AddNewProduct()
  {
    if(this.productName.trim().length > 0)
    {
this.saveNewProduct();
    }
    else 
    {
this.displayMsg("Please provide a valid product name");
    }
  }

  public saveNewProduct()
  {
    this.showMsg = false;
    this.createLoadingCtrl();
    var groupId = this.groupId;
  let prod = new GroupProduct();
  prod.productName = this.productName;
  prod.nextVisit = '0';
  prod.groupId = groupId;
    this.groupProductService.addProductapi(prod).subscribe((value)=>{         
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
       content: "Please wait while trying to add product"
      }
    )
    this.loader.present();
  }
 
  public dismissLoader()
  {
      this.loader.dismiss();
  }

  public valuechange(newvalue){
    if(newvalue.trim().length>0)
    {
      this.showMsg = false;
    }
  }
}
