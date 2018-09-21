import {Component, Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import {User} from '../../DataModels/Users';
import {UserService} from '../../DataService/UsersService';
import {Storage} from '@ionic/storage';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';

@Component({
    selector: 'page-signup',
    templateUrl: 'SignUpPage.html',
    styleUrls:['/pages/Login/SignUpPage.scss']
})
export class SignUpPage{
server:Http
validation_Form : FormGroup;

constructor(private http:Http, public formBuilder:FormBuilder,public userservice: UserService,
    public storage : Storage, public navCtrl : NavController)
{
    this.server = http;
}

ionViewWillLoad()
{

this.validation_Form = this.formBuilder.group({
    firstName: new FormControl('hhh',Validators.required),
    lastName: new FormControl('',Validators.required),
    emailId:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ])),
    passWord: new FormControl('',Validators.required)
})
}

onSubmit(values)
{
    console.log(values);
    this.createUser(values);
}


createUser(values)
{
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
},
err => {
    console.log(err);
  });
 }
}


