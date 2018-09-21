import { Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import {ListPage} from '../list/list';
import {ProductService} from '../../DataService/ProductService';




@Component({
  selector: 'delete-modal',
  templateUrl: 'DeleteModal.html',
  styleUrls:['/pages/DeleteModal/DeleteModal.scss']
})
export class DeleteModalPage {
  rootPage: any = ListPage;
  userId:string;
 // products: Array<{name:string,nextVisit:Number}> ;
 products: Array<any>;
  constructor(public productService:ProductService, params: NavParams) {     
   this.userId = params.get('userId');
  }

 

  public DeleteItem(product : any)
  {
    var userId = this.userId;
    this.productService.deleteProductapi(userId).subscribe((val)=> {
 
    },
   err => {
   })
 
  }

}
