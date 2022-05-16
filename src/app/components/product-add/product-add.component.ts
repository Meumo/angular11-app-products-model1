import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {EventDriverService} from "../../services/event.driver.service";
import {ProductActionsTypes} from "../../state/product.state";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup!:FormGroup;
  submitted:boolean=false;
  constructor(private eventDriverService:EventDriverService,
    private fb:FormBuilder, private productService:ProductService, private router:Router) { }

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
        this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED});
        alert("Success saving Opertaion .....")
        this.router.navigateByUrl("/products");
      },error => {
        console.log(error);
      });
  }
}
