import { EmployeeService } from './services/employee.service';
import { Employee } from './employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'employeemanagerapp - front';
    public employees: Employee[] = []
    public editEmployee!: Employee;
    public deleteEmployee!: Employee;
    
    constructor(private employeeService: EmployeeService){}

    public getEmployees() {
        return this.employeeService.getEmployees().subscribe(
            (fetchedEmployees: Employee[]) => {
                this.employees = fetchedEmployees;
            },
            (error: HttpErrorResponse) => {
                console.error(error.message);
                alert(error.message);
            }
        )
    }
    
    ngOnInit(): void {
        this.getEmployees();
    }
    
    public onOpenModal(employee:any, operation: string) {
        const main_container = document.getElementById('main-container');
        
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (operation === 'add') {
            button.setAttribute('data-target', '#addEmployeeModal');
        }
        if (operation === 'edit') {
            this.editEmployee = employee;
            button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if (operation === 'delete') {
            this.deleteEmployee = employee;
            button.setAttribute('data-target', '#deleteEmployeeModal');
        }
        
        main_container?.appendChild(button);
        button.click();
    }
    
    public onAddEmployee(addForm: NgForm): void {
        document.getElementById('add-employee-form')?.click();
        this.employeeService.addEmployee(addForm.value).subscribe(
            (res: Employee) => {
                console.log(res);
                this.getEmployees();
                addForm.reset();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }
    public onUpdateEmployee(employee:Employee): void {
        this.employeeService.updateEmployee(employee).subscribe(
            (res: Employee) => {
                console.log(res);
                this.getEmployees();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }
    public onDeleteEmployee(employeeId:number): void {
        this.employeeService.deleteEmployee(employeeId).subscribe(
            (res: void) => {
                console.log(res);
                this.getEmployees();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }
    
    public searchEmployees(key: string): void{
        let results: Employee[] = [];
        for (const employee of this.employees) {
            if (employee?.name.toLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
                employee?.email.toLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
                employee?.jobTitle.toLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
                employee?.phone.toLowerCase().indexOf(key.toLocaleLowerCase()) !== -1) {
                
                results.push(employee);
            }
        }
        this.employees = results;
        
        if (!key || results.length === 0) {
            this.getEmployees();
        }
    }
}
