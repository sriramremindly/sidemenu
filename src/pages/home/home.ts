import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GroupService} from '../../DataService/GroupsService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public groupService:GroupService) {
this.groupService.groupId = "";
  }

}
