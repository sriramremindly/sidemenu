import {Injectable,EventEmitter} from '../../node_modules/@angular/core';
import {Http,HttpModule, RequestOptions,Headers} from '../../node_modules/@angular/http';
import {HttpHeaders} from '../../node_modules/@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Product} from '../DataModels/Products';

@Injectable()
export class ProductService{
server : Http;

constructor(private http: Http)
{
    this.server = http;
}

/* getProductsList():Observable<any>
{
  return  this.server.get('https://api.mlab.com/api/1/databases/remindly/collections/products?apiKey=GvE5cyrcq9NxjEZqlGreNs-AxtDPCnDc');
} */

getProductsListapi():Observable<any>
{
  return  this.server.get('http://localhost:3000/products/all');
}

/* deleteProduct(usid : any)
{
return this.server.delete('https://api.mlab.com/api/1/databases/remindly/collections/products/' + usid + '?apiKey=GvE5cyrcq9NxjEZqlGreNs-AxtDPCnDc');
} */

deleteProductapi(usid : any)
{
return this.server.delete('http://localhost:3000/products/' + usid);
}

/* addProduct(product : Product):Observable<any>
{
  const httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'
    })
  };
 return  this.server.post('https://api.mlab.com/api/1/databases/remindly/collections/products?apiKey=GvE5cyrcq9NxjEZqlGreNs-AxtDPCnDc',
  product,httpOptions);
} */

addProductapi(product : Product):Observable<any>
{
  const httpOptions = {
    headers: new Headers({
      'Content-Type':  'application/json'
    })
  };
 return  this.server.post('http://localhost:3000/products', product,httpOptions);
}

/* updateProduct(product:Product):Observable<any>
{
  let usid = product.userId;
  let nextVisitValue = product.nextVisit == true?'1':'0';
  let prodToUpdate = {productName :product.productName,nextVisit:nextVisitValue};
const httpOptions = {
headers: new Headers({
  'Content-Type':  'application/json',     
      'dataType': 'jsonp',
})
};
return this.server.put('https://api.mlab.com/api/1/databases/remindly/collections/products/' + usid + '?apiKey=GvE5cyrcq9NxjEZqlGreNs-AxtDPCnDc',
JSON.stringify(prodToUpdate),httpOptions);
} */

updateProductapi(product:Product):Observable<any>
{
  let usid = product.userId;
  let nextVisitValue = product.nextVisit == true?'1':'0';
  let prodToUpdate = {productName :product.productName,nextVisit:nextVisitValue};
const httpOptions = {
headers: new Headers({
  'Content-Type':  'application/json',     
      'dataType': 'jsonp',
})
};
return this.server.put('http://localhost:3000/products/' + usid,
                        JSON.stringify(prodToUpdate),httpOptions);
  }
}


