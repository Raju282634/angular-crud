import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  conditionList = ['New one', 'Old one', 'Refubrised'];

  productForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
      });
  }

  addProduct(){
    console.log(this.productForm.value);
  }

}

