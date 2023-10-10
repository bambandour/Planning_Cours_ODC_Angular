import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ParentService <T,U>{
  public api:string=environment.apiUrl
  public base:string=""
  
  constructor(private http:HttpClient) { }
  add(code:U):Observable<T>{
    return this.http.post<T>(this.api+`base`,code)
  }

  
}
