import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GroupService } from '../../DataService/GroupsService';
import { MenuService } from '../../DataService/MenuService';
import {UserGroupService} from '../../DataService/UserGroupService';


@Component({
    selector: 'page-GroupUsers',
    templateUrl: 'GroupUsers.html',
    styleUrls: ['/pages/GroupUsers/GroupUsers.scss']
})
export class GroupUserspage implements OnInit {

    users: Array<any>;
    groupId: string;
    userName: string;
    submitMsg: string;
    constructor(public navCtrl: NavController, public groupService: GroupService,
        public menuService: MenuService, public navParams: NavParams,
         public userGroupService:UserGroupService) {
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
       var goupId = this.groupService.groupId;
       var userName = this.userName
   this.userGroupService.addUsertoGroup(userName,goupId).subscribe((value)=> {
console.log(value);
   },
   err => {
console.log(err);
   });
    }
}