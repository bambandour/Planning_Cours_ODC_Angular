import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Cours } from '../interfaces/planning';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  public api:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  add(cours:Cours):Observable<Data>{
    return this.http.post<Data>(this.api+'cours',cours)
  }

  get():Observable<Data>{
    return this.http.get<Data>(this.api+'cours')
  }

}
