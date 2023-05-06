import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../Service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add-update',
  templateUrl: './employee-add-update.component.html',
  styleUrls: ['./employee-add-update.component.scss'],
})
export class EmployeeAddUpdateComponent implements OnInit{
  Empform: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeAddUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.Empform = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
    });
  }
  ngOnInit(): void {
    this.Empform.patchValue(this.data)

  }

  education: string[] = ['SSC', 'HSC', 'DIPLOMA', 'DEGREE'];

  submitForm() {
    if (this.Empform.valid) {
      if(this.data){
        this.empService.updateEmpInfo(this.data.id, this.Empform.value).subscribe({
          next:(val:any)=>{
            alert('Employee updated successfully');
            this.dialogRef.close(true);
          },
        })
      }else{

        console.log(this.Empform.value);
        this.empService.addEmpInfo(this.Empform.value).subscribe({
          next: (val: any) => {
            alert('Employee Added successfully ');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
