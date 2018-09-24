import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GroupService } from '../../DataService/GroupsService';


@Component({
    selector: 'page-Groups',
    templateUrl: 'GroupsPage.html',
    styleUrls: ['/pages/Groups/GroupsPage.scss']
})
export class Groupspage implements OnInit {

    groups:Array<any>;
    constructor(public navCtrl: NavController, public groupService: GroupService) {

    }

  public ngOnInit() {

        this.groupService.getGroupsApi().subscribe((value) => {
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
        
    }

}