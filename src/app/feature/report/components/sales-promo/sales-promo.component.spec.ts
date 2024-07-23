import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPromoComponent } from './sales-promo.component';

describe('SalesPromoComponent', () => {
  let component: SalesPromoComponent;
  let fixture: ComponentFixture<SalesPromoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesPromoComponent]
    });
    fixture = TestBed.createComponent(SalesPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
