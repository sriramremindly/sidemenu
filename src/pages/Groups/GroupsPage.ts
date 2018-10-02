import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroupService } from '../../DataService/GroupsService';
import {MenuService} from '../../DataService/MenuService';
import {AuthService} from '../../DataService/AuthService';
import {User} from '../../DataModels/Users';

@Component({
    selector: 'page-Groups',
    templateUrl: 'GroupsPage.html',
    styles: ['/pages/Groups/GroupsPage.scss']
})
export class Groupspage implements OnInit {

    groups:Array<any>;
    user : User;
    constructor(public navCtrl: NavController, public groupService: GroupService,
                public menuService: MenuService, public authService:AuthService) {
    this.user = this.authService.getUserDetails();
        }

  public ngOnInit() {
       let userId = this.user.userId;
        this.groupService.getGroupsApi(userId).subscribe((value) => {
            let data = JSON.parse(value._body);
            let obj = data.message;
            this.groups = obj.map(val => {
                 return {groupName:val.groupName,groupId:val._id}; 
             })
        },
            err => {

            })
    }

    public displayGroupDetails(group:any)
    {
        this.menuService.groupsSelected.emit(group);
    }

}