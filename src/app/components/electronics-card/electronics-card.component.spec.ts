import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsCardComponent } from './electronics-card.component';

describe('ElectronicsCardComponent', () => {
  let component: ElectronicsCardComponent;
  let fixture: ComponentFixture<ElectronicsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectronicsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectronicsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 