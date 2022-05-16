import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup!:FormGroup;
  submitted:boolean=false;
  constructor(private fb:FormBuilder, private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group(
      {
        name:["",Validators.required],
        price:[0,Validators.required],
        quantity:[0,Validators.required],
        selected:[true,Validators.required],
        available:[true,Validators.required]
      }
    );
  }

  onSave() {
    this.submitted=true;
    if(this.productFormGroup.invalid) return;
    this.productService.save(this.productFormGroup!.value)
      .subscribe(data=>{
        alert("Success saving Opertaion .....")
        this.router.navigateByUrl("/products");
      },error => {
        console.log(error);
      });
  }
}
