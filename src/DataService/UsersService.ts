import {Injectable,EventEmitter} from '../../node_modules/@angular/core';
import {Http,HttpModule, RequestOptions,Headers} from '../../node_modules/@angular/http';
import {HttpHeaders} from '../../node_modules/@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {User} from '../DataModels/Users';

@Injectable()
export class UserService{
server:Http;

constructor(private http:Http)
{
    this.server = http;
}

addUserapi(user : User):Observable<any>
{
  const httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'
    })
  };
  let userToAdd = {firstName: user.firstName,lastName: user.lastName,email:user.email,password: user.password};

  return  this.server.post('https://remindly.herokuapp.com/users', userToAdd,httpOptions);
}

}