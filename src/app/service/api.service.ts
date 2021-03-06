import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient){}
  fetchBanksData(city:any) {
    let apiURLPath=`https://vast-shore-74260.herokuapp.com/banks?city=${city}`;
    return this.http.get<any>(apiURLPath).pipe(map(responseData=> responseData))
 }
}
