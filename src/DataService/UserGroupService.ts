import {Injectable,Inject} from '@angular/core';
import {Http,Headers} from '@angular/http';
import {environment} from '../environment/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UserGroupService {
    server: Http;

    constructor(private http: Http){
        this.server = http;
    }

    public addUsertoGroup(username:string, groupId:string) {
        var url = environment.dataApiUrl;
        var endpoint = url + 'userGroups';
        const httpOptions = {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        let userGroup = {groupId :groupId,userName:username};
        return this.server.post(endpoint, JSON.stringify(userGroup), httpOptions);
    }
}