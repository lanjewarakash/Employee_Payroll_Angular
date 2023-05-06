import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddUpdateComponent } from '../employee-add-update/employee-add-update.component';
import { EmployeeService } from '../Service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'gender',
    'dob',
    'education',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private empService: EmployeeService) {}
  ngOnInit(): void {
    this.getEmployeeInfo();
  }

  openAddEmployeeInfo() {
    const dialogRef =this.dialog.open(EmployeeAddUpdateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getEmployeeInfo()

        }
      }
    })


    
  }
  openEditEmployeeInfo(data:any) {
    this.dialog.open(EmployeeAddUpdateComponent , {data});
  
  }

  getEmployeeInfo() {
    this.empService.getEmpInfo().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  deleteEmployeeInfo(id: number) {
    this.empService.deleteEmpInfo(id).subscribe({
      next: (res) => {
        alert('Employee Deleted');
        this.getEmployeeInfo();
      },
      error: console.log,
    });
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
