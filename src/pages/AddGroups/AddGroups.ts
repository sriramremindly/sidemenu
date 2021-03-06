import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { GroupService } from '../../DataService/GroupsService';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../DataModels/Groups';
import { AuthService } from '../../DataService/AuthService';
import { User } from '../../DataModels/Users';


@Component({
  selector: 'page-AddGroups',
  templateUrl: 'AddGroups.html',
  styles: ['AddGroups.scss']
})
export class AddGroupsPage implements OnInit {
  rootPage: any = ListPage;
  groupName: string;
  submitMsg: string;
  showMsg: boolean = false;
  loader: any;
  user:User;
  products: Observable<Array<any>>;
  constructor(public navCtrl: NavController, public groupService: GroupService,
    public authService: AuthService, public loadingCtrl: LoadingController) {

  }

  public ngOnInit() {

  }

  public AddNewGroup() {
    if (this.groupName.trim().length > 0) {
      this.saveNewGroup();
    }
    else {
      this.displayMsg("Please enter a valid Group name");
    }
  }

  public valuechange(newvalue) {
    if (newvalue.trim().length > 0) {
      this.showMsg = false;
    }
  }

  public saveNewGroup() {
    this.user = this.authService.user;
    this.showMsg = false;
    this.createLoadingCtrl();
      let group = new Group();
      group.groupName = this.groupName;
      group.groupOwner = this.user.userId;
      this.groupService.addNewGroup(group).subscribe((value) => {
        let obj = JSON.parse(value._body);
        this.displayMsg("Group has been added successfully");
        this.dismissLoader();
      },
        err => {
          let msg = err._body;
          if (msg.includes("duplicate key found")) {
            this.displayMsg("Error in adding the product");
            this.dismissLoader();
          }
        }
      );
    
  }

  public displayMsg(msg) {
    this.showMsg = true;
    this.submitMsg = msg;
  }
  public createLoadingCtrl() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait while trying to add product"
    }
    )
    this.loader.present();
  }

  public dismissLoader() {
    this.loader.dismiss();
  }
}
