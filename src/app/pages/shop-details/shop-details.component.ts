import { Component, OnInit } from '@angular/core';
import { ShopProductDetailsComponent } from '../../components/shop-product-details/shop-product-details.component';
import { ProductService } from '../../services/product-service/product.service';
import CatalogProduct from '../../model/CatalogProduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  standalone: true,
  imports: [ShopProductDetailsComponent],
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.scss',
})
export class ShopDetailsComponent implements OnInit {
  listOfProducts?: CatalogProduct;

  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    this.productservice
      .getProducts()
      .subscribe(
        (products) =>
          (this.listOfProducts = products.find(
            (product) => product.id == productId
          ))
      );
  }
}
