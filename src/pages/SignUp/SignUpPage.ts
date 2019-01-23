import {Component, Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import {User} from '../../DataModels/Users';
import {UserService} from '../../DataService/UsersService';
import {Storage} from '@ionic/Storage';
import {NavController,LoadingController} from 'ionic-angular';
import {HomePage} from '../home/home';

@Component({
    selector: 'page-signup',
    templateUrl: 'SignUpPage.html',
    styles:['SignUpPage.scss']
})
export class SignUpPage{
server:Http
validation_Form : FormGroup;
loader:any;
showMsg:boolean= false;
submitMsg:string;

constructor(private http:Http, public formBuilder:FormBuilder,public userservice: UserService,
    public storage : Storage, public navCtrl : NavController,public loadingCtrl: LoadingController)
{
    this.server = http;
}

ionViewWillLoad()
{

this.validation_Form = this.formBuilder.group({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    emailId:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    passWord: new FormControl('',Validators.required)
})
}

onSubmit(values)
{
    if(this.validation_Form.valid)
    {
        this.createUser(values);
    }
}


createUser(values)
{   
    this.createLoadingCtrl();
let userToAdd = new User();
userToAdd.firstName  = values.firstName;
userToAdd.lastName = values.lastName;
userToAdd.email = values.emailId;
userToAdd.password = values.passWord;

this.userservice.addUserapi(userToAdd).subscribe((value)=>{

    let userEmail = JSON.parse(value._body).message.email;
    this.storage.set('userName',userEmail);
    this.storage.set('isLoggedIn',true);
    this.navCtrl.setRoot(HomePage);
    console.log(value);
    this.dismissLoader();
},
err => {
    this.dismissLoader();
    this.displayMsg("Error in creating account.Please try with a different email");
    console.log(err);
  });
 }

 public createLoadingCtrl()
 {
     this.loader = this.loadingCtrl.create({
      content: "Please wait while trying to create User"
     }
   )
   this.loader.present();
 }

 public dismissLoader()
 {
     this.loader.dismiss();
 }

 public displayMsg(msg)
 {
  this.showMsg = true;
  this.submitMsg = msg;
 }

 public valuechange(newvalue){
      this.showMsg = false;
  }
}


