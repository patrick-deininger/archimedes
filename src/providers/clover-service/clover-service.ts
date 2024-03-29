import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the CloverServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CloverServiceProvider {

  public inventoryItemsData: any;
  public customerData: any;
  public customerList: any;

  constructor(public http: HttpClient) {
    console.log('Hello CloverServiceProvider Provider');
  }

  /*
  getApiUrl : string = 'https://apisandbox.dev.clover.com/v3/merchants/VDGK0HE8FX652/items --header "Authorization:Bearer 2d573c3d-3abe-386a-8618-ad1801b3b62a"';

  getPosts() {

    return this.http.get(this.getApiUrl)
      .do((res : Response) => console.log(res.json())
      .map((res : Response) => res.json())
      .catch(error => console.log(error)));

  }*/

  loadInventoryItems () {
    if (this.inventoryItemsData) {
    // already loaded data
    return Promise.resolve(this.inventoryItemsData);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    // this.http.get('https://randomuser.me/api/?results=10')
    this.http.get('https://apisandbox.dev.clover.com/v3/merchants/VDGK0HE8FX652/items?access_token=a75ce0f4-d4b5-9bfd-a272-3d87dd18c575') // ' | python -mjson.tool')
      // this.http.get('path/to/data.json')
      //.map((res: Response) => res.json())
      .do((res : Response) => console.log(res))
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.inventoryItemsData = data;
        resolve(this.inventoryItemsData);
      });
    });
  }

  loadCustomerMetadata () {
    if (this.customerData) {
      return Promise.resolve(this.customerData);
    }

    return new Promise(resolve => {
      this.http.get('https://apisandbox.dev.clover.com/v3/merchants/VDGK0HE8FX652/customers/09J9XVK1EBQR0?access_token=a75ce0f4-d4b5-9bfd-a272-3d87dd18c575')
      .do((res : Response) => console.log(res))
      .subscribe(data => {
        this.customerData = data;
        resolve(this.customerData);
      })
    })
  }

  loadCustomers() {
    if (this.customerList) {
      return Promise.resolve(this.customerList);
    }

    return new Promise(resolve => {
      this.http.get('https://apisandbox.dev.clover.com/v3/merchants/VDGK0HE8FX652/customers?access_token=a75ce0f4-d4b5-9bfd-a272-3d87dd18c575')
      .do((res : Response) => console.log(res))
      .subscribe(data => {
        this.customerList = data;
        resolve(this.customerList);
      })
    })
  }

}
