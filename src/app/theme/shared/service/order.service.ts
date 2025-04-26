import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //private http = inject(HttpClient);
  constructor(private http: HttpClient ) { }

  addOrder(request){
    const accessToken = "";
      let api_url = '';
      api_url = environment.API_BASE_URL + '' + environment.API_ADMIN_URL + 'order/add';
      return this.http.post<any>(api_url, request, {
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + accessToken
        },
      }).pipe(map((data: any) => {
        //const decryptData = this.encrypt.decryptData(data.data);
        console.log(data);
        return data;
      }));
  }
  
  getOrder(request){
    const accessToken = "";
      let api_url = '';
      api_url = environment.API_BASE_URL + '' + environment.API_ADMIN_URL + 'order/list';
      return this.http.post<any>(api_url, request, {
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + accessToken
        },
      }).pipe(map((data: any) => {
        //const decryptData = this.encrypt.decryptData(data.data);
        console.log(data);
        return data;
      }));
  }

}

