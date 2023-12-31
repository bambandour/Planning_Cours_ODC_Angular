import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Data, Root, Session } from '../cours';
import { ParentService } from './parent.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public api:string=environment.apiUrl
  user=JSON.parse(localStorage.getItem('current_user')!)

  constructor(private parentService:ParentService<Data,Session>, private http:HttpClient) { }

  add(session:Session|any):Observable<Data>{
    return this.http.post<Data>(this.api+'session',session)
  }
  get():Observable<Data>{
    return this.http.get<Data>(this.api+'role/'+this.user.role+'/user/'+this.user.id+'/sessions')
  }
  cancelSession(session:number):Observable<Data>{
    return this.http.get<Data>(this.api+'session/cancel/'+session)
  }
  validatedSession(session:number):Observable<Data>{
    return this.http.get<Data>(this.api+'session/validated/'+session)
  }
  invalidatedSession(session:number):Observable<Data>{
    return this.http.get<Data>(this.api+'session/invalidated/'+session)
  }
  getSessionByprof(prof:number):Observable<Data>{
    return this.http.get<Data>(this.api+'session/prof'+prof)
  }
  getSessionByUser(user:number):Observable<Data>{
    return this.http.get<Data>(this.api+'session/prof'+user)
  }
  notification():Observable<Root>{
    return this.http.get<Root>(this.api+'demande')
  }
  demande(demande:{session:number, motif:string}):Observable<Root>{
    return this.http.post<Root>(this.api+'demande',demande)
  }
}
