import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClinet: HttpClient) {}

  addEmpInfo(data: any): Observable<any> {
    return this.httpClinet.post('http://localhost:3000/employee', data);
  }

  getEmpInfo(): Observable<any> {
    return this.httpClinet.get('http://localhost:3000/employee');
  }

  deleteEmpInfo(id: any): Observable<any> {
    return this.httpClinet.delete(`http://localhost:3000/employee/${id}`);
  }

  updateEmpInfo(id:any , data:any){
    return this.httpClinet.put(`http://localhost:3000/employee/${id}`,data)

  }
}
