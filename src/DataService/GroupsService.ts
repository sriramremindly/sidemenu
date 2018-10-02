import { Inject, Injectable } from '../../node_modules/@angular/core';
import { Http, Headers } from '../../node_modules/@angular/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs/Observable';
import { Group } from '../DataModels/Groups';



@Injectable()
export class GroupService {
    server: Http;
    groupId: string = "";

    constructor(private http: Http) {
        this.server = http;
    }

    getGroupsApi(userId: string): Observable<any> {
        var url = environment.dataApiUrl;
        var endpoint = url + 'groups/all/' + userId;
        return this.server.get(endpoint);
    }

    addNewGroup(group: Group): Observable<any> {
        var url = environment.dataApiUrl;
        var endpoint = url + 'groups';
        const httpOptions = {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        return this.server.post(endpoint, group, httpOptions);
    }

    getGroupUsers(groupId:string):Observable<any>{
        this.groupId = groupId;
        var url = environment.dataApiUrl;
        var endpoint = url + 'groups/' + groupId;
        return this.server.get(endpoint);
    }
}

