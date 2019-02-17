import { ShoppingCartService } from '../../../shared/services/shopping-cart/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products = [];
  filterdProducts = [];
  selectedCategory: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(
      switchMap(
        products => {
          this.products = products;
          return this.route.queryParamMap;
        })
    ).subscribe(
          params => {
            this.selectedCategory = params.get('category');
            this.applyFilter();
          }
        );
  }
  
  private applyFilter() {
    this.filterdProducts = (this.selectedCategory) ?
    this.products.filter(p => p.category === this.selectedCategory) :
    this.products;
  }
  ngOnDestroy() {

  }

}
