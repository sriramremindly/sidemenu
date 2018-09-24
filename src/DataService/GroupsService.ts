import {Inject, Injectable}  from '../../node_modules/@angular/core';
import { Http } from '@angular/http';
import {environment} from '../environment/environment';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class GroupService {
server:Http;

constructor(private http:Http ) {
    this.server = http;
}

getGroupsApi() :Observable<any>
{
    var url = environment.dataApiUrl;
    var endpoint = url + 'groups/all';
    return this.server.get(endpoint);
}
}

