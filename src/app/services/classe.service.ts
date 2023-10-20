import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Classroom, Root } from '../cours';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  public api:string=environment.apiUrl
  constructor(private http:HttpClient) { }

  get():Observable<Classroom>{
    return this.http.get<Classroom>(this.api+'classes')
  }

  importStudents(file:any):Observable<any>{
    return this.http.post(this.api+'import',file)
  }
}
