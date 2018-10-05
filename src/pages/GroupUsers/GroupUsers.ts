import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GroupService } from '../../DataService/GroupsService';
import { MenuService } from '../../DataService/MenuService';
import {UserGroupService} from '../../DataService/UserGroupService';


@Component({
    selector: 'page-GroupUsers',
    templateUrl: 'GroupUsers.html',
    styles: ['/GroupUsers.scss']
})
export class GroupUserspage implements OnInit {

    users: Array<any>;
    groupId: string;
    userName: string;
    submitMsg: string ;
    showMsg:boolean= false;
    loader:any;
    constructor(public navCtrl: NavController, public groupService: GroupService,
        public menuService: MenuService, public navParams: NavParams,
         public userGroupService:UserGroupService,public loadingCtrl: LoadingController) {
        this.groupId = this.navParams.get("groupId");
    }

    public ngOnInit() {
        this.groupService.getGroupUsers(this.groupId).subscribe((value) => {
            let data = JSON.parse(value._body);
            let obj = data.message;
            this.users = obj.map(val => {
                var name = val.firstName + " " + val.lastName;
                return { userName: name };
            })
        },
            err => {

            })
    }

   public AddNewUser() {
 if(this.userName.trim().length > 0)
 {
this.saveNewUser();
 }
 else 
 {
     this.displayMsg("Please provide a valid user name");
 }
    }

  public saveNewUser()
  {

    this.showMsg = false;
this.createLoadingCtrl();
    var goupId = this.groupService.groupId;
       var userName = this.userName
   this.userGroupService.addUsertoGroup(userName,goupId).subscribe((value)=> {
    this.displayMsg("User has been added to the group successfully.");
    this.dismissLoader();
   },
   err => {
    this.displayMsg("Error in adding the user to the group.");
    this.dismissLoader();
   });
  }

    public displayMsg(msg)
    {
     this.showMsg = true;
     this.submitMsg = msg;
    }

    public createLoadingCtrl()
    {
        this.loader = this.loadingCtrl.create({
         content: "Please wait while trying to add User to group"
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