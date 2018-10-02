import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {GroupProductService} from '../../DataService/GroupProductsService';
import { Observable } from 'rxjs/Observable';
import {GroupProduct} from '../../DataModels/GroupProducts';
import {GroupService} from '../../DataService/GroupsService';
import {User} from '../../DataModels/Users';


@Component({
  selector: 'page-AddGroupProducts',
  templateUrl: 'AddGroupProducts.html',
  styleUrls:['/pages/AddGroupProducts/AddGroupProducts.scss']
})
export class AddGroupProductsPage  implements OnInit{
  rootPage: any = ListPage;
  productName: string;
  submitMsg: string;
  groupId: string;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Observable<Array<any>>;
  constructor(public navCtrl: NavController,public groupProductService:GroupProductService,
              public groupService: GroupService) {     
     this.groupId = this.groupService.groupId;  
  }

  public ngOnInit()
  {

  }

  public AddNewProduct()
  {
    var groupId = this.groupId;
  let prod = new GroupProduct();
  prod.productName = this.productName;
  prod.nextVisit = '0';
  prod.groupId = groupId;
    this.groupProductService.addProductapi(prod).subscribe((value)=>{         
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
