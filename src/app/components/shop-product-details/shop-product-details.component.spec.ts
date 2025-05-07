import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDetailsComponent } from './shop-product-details.component';

describe('ShopProductDetailsComponent', () => {
  let component: ShopProductDetailsComponent;
  let fixture: ComponentFixture<ShopProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopProductDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
