import { Employee } from './../employee';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiBaseUrl;
    
    public getEmployees(): Observable<Employee[]>{
        return this.http.get<Employee[]>(`${this.apiUrl}/all`);
    }
    
    public addEmployee(employee:Employee): Observable<Employee>{
        return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
    }
    
    public deleteEmployee(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
    
    public updateEmployee(employee: Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiUrl}/update`, employee);    
    }
    
    public findEmployeeById(id: number): Observable<Employee>{
        return this.http.get<Employee>(`${this.apiUrl}/find/${id}`);
    }
}
