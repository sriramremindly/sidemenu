import {Injectable,EventEmitter} from '../../node_modules/@angular/core';
import {Http,HttpModule} from '../../node_modules/@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService{
server : Http;

constructor(private http: Http)
{
    this.server = http;
}

getProductsList():Observable<any>
{
  return  this.server.get('https://api.mlab.com/api/1/databases/remindly/collections/products?apiKey=GvE5cyrcq9NxjEZqlGreNs-AxtDPCnDc');
}

deleteProduct()
{

}


}


