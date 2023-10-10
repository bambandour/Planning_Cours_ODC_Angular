import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Data, Session } from '../cours';
import { ParentService } from './parent.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public api:string=environment.apiUrl
  constructor(private parentService:ParentService<Data,Session>, private http:HttpClient) { }
  add(session:Session|any):Observable<Data>{
    return this.http.post<Data>(this.api+'session',session)
  }
  
  get():Observable<Data>{
    return this.http.get<Data>(this.api+'session')
  }
}
