import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productService: ProductService,private router:Router) {
  }

  ngOnInit(): void {
  }


  onGetAllProducts() {
    this.products$=this.productService.getAllProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
    }

  onGetSelectedProducts() {
    this.products$=this.productService.getSelectedProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$=this.productService.getAvailableProducts().pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$=this.productService.searchProducts(dataForm.keyword).pipe(
      map((data)=>({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err =>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      },error => {
        console.log(error)
      });
  }

  onDelete(p: Product) {
    let v=confirm("Etes vous sûre?")
    if(v==true)
    this.productService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      },error => {
        console.log(error);
      });
  }

  onNewProducts() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
