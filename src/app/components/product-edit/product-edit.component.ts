import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventDriverService} from "../../services/event.driver.service";
import {ProductActionsTypes} from "../../state/product.state";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private eventDriverService: EventDriverService,
              private activatedRoute: ActivatedRoute, private productService: ProductService, private fb: FormBuilder, private router: Router) {
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProducts(this.productId)
      .subscribe(product => {
        this.productFormGroup = this.fb.group({
          id: [product.id, Validators.required],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required]
        })
      });
  }

  onUpdate() {
    this.productService.updateProduct(this.productFormGroup.value)
      .subscribe(data => {
this.eventDriverService.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED});
        alert("Success");
        this.router.navigateByUrl("/products");
      }, error => {
        console.log(error)
      });
  }
}
