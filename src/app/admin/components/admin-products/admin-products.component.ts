import { ProductService } from '../../../shared/services/product/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from '../../../shared/data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[];
  subscription: Subscription;
  tableResource: DataTableResource<any>;
  items = [];
  itemCount = 0;

  constructor( private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      products => {
        this.products = products;
        this.intiaizeTable(products);
      }
    );
  }
  private intiaizeTable(products) {

    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0}).then(items => { this.items = items; });
    this.tableResource.count().then(count => {  this.itemCount = count; });

  }

  reloadItems(params) {
    if (!this.tableResource) {  return; }
    this.tableResource.query(params).then(items => {  this.items = items; });
  }

  filter(searchValue) {
    const filteredProducts = (searchValue) ?
    this.products.filter(p => {
      return p.title.toLowerCase().includes(searchValue.value.toLowerCase());
    }) : this.products;
    this.intiaizeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
