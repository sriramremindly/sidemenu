import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import {GroupService} from '../../DataService/GroupsService';
import { Observable } from 'rxjs/Observable';
import {Group} from '../../DataModels/Groups';
import {AuthService} from '../../DataService/AuthService';


@Component({
  selector: 'page-AddGroups',
  templateUrl: 'AddGroups.html',
  styleUrls:['/pages/AddGroups/AddGroups.scss']
})
export class AddGroupsPage  implements OnInit{
  rootPage: any = ListPage;
  groupName: string;
  submitMsg: string;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Observable<Array<any>>;
  constructor(public navCtrl: NavController,public groupService:GroupService,
    public authService:AuthService) {     
            
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

  public AddNewGroup()
  {
    var user = this.authService.getUserDetails();
  let group = new Group();
  group.groupName = this.groupName;
  group.groupOwner = user.userId;
    this.groupService.addNewGroup(group).subscribe((value)=>{         
      let obj = JSON.parse(value._body);
      this.submitMsg = "Group has been added successfully";
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
