import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {ListPage} from '../list/list';
import {GroupService} from '../../DataService/GroupsService';
import { Observable } from 'rxjs/Observable';
import {Group} from '../../DataModels/Groups';
import {AuthService} from '../../DataService/AuthService';


@Component({
  selector: 'page-AddGroups',
  templateUrl: 'AddGroups.html',
  styles:['AddGroups.scss']
})
export class AddGroupsPage  implements OnInit{
  rootPage: any = ListPage;
  groupName: string;
  submitMsg: string;
  showMsg:boolean= false;
  loader:any;
 // products: Array<{name:string,nextVisit:Number}> ;
 products:Observable<Array<any>>;
  constructor(public navCtrl: NavController,public groupService:GroupService,
    public authService:AuthService,public loadingCtrl: LoadingController) {     
            
  }

  public ngOnInit()
  {

  }

  public AddNewGroup()
  {
    this.showMsg = false;
    this.createLoadingCtrl();
    var user = this.authService.getUserDetails();
  let group = new Group();
  group.groupName = this.groupName;
  group.groupOwner = user.userId;
    this.groupService.addNewGroup(group).subscribe((value)=>{         
      let obj = JSON.parse(value._body);
      this.displayMsg("Group has been added successfully");
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
}
