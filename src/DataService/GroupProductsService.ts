import {Injectable,EventEmitter} from '../../node_modules/@angular/core';
import {Http,HttpModule, RequestOptions,Headers} from '../../node_modules/@angular/http';
import { Observable } from 'rxjs/Observable';
import {GroupProduct} from '../DataModels/GroupProducts';
import {environment} from '../environment/environment';

@Injectable()
export class GroupProductService{
server : Http;

constructor(private http: Http)
{
    this.server = http;
}

getProductsListapi(groupId):Observable<any>
{
  var url = environment.dataApiUrl;
  var endpoint = url + 'groupProducts/all/' + groupId;
  return  this.server.get(endpoint);
}


deleteProductapi(usid : any)
{
  var url = environment.dataApiUrl;
  var endpoint = url + 'groupProducts/';
  return this.server.delete(endpoint + usid);
}

addProductapi(grouPproduct : GroupProduct):Observable<any>
{
  var url = environment.dataApiUrl;
  var endpoint = url + 'groupProducts';
  const httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'
    })
  };
 return  this.server.post(endpoint, grouPproduct,httpOptions);
}

updateProductapi(groupProduct:GroupProduct):Observable<any>
{
  var url = environment.dataApiUrl;
  var endpoint = url + 'groupProducts/';
  let groupProdId = groupProduct.groupProdId;
  let groupId = groupProduct.groupId;
  let nextVisitValue = groupProduct.nextVisit == true?'1':'0';
  let prodToUpdate = {productName :groupProduct.productName,nextVisit:nextVisitValue,groupId:groupId};
const httpOptions = {
headers: new Headers({
  'Content-Type':  'application/json'
})
};
return this.server.put(endpoint + groupProdId,
                        JSON.stringify(prodToUpdate),httpOptions);
  }
}


