import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  conditionList = ['New one', 'Old one', 'Refubrised'];

  productForm: FormGroup;

  constructor(private fb: FormBuilder,
              private api: ApiService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogueRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
      });

    if (this.editData) {
      this.productForm.patchValue({
        productName: this.editData.productName,
        category: this.editData.category,
        date: this.editData.date,
        condition: this.editData.condition,
        price: this.editData.price,
        description: this.editData.description
      });
    }

    // if (this.editData) {
    //   this.productForm.controls['productName'].setValue(this.editData.productName);
    //   this.productForm.controls['category'].setValue(this.editData.category);
    //   this.productForm.controls['date'].setValue(this.editData.date);
    //   this.productForm.controls['condition'].setValue(this.editData.condition);
    //   this.productForm.controls['price'].setValue(this.editData.price);
    //   this.productForm.controls['description'].setValue(this.editData.description);
    // }


  }

  addProduct(){
    if (this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          alert('Product added successfully');
          this.productForm.reset();
          this.dialogueRef.close('save'); },
        error: () => { alert('Error while adding a Product'); }
      });
    }
  }
}

