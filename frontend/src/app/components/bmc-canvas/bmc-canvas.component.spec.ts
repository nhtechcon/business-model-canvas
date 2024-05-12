import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcCanvasComponent } from './bmc-canvas.component';

describe('BmcCanvasComponent', () => {
  let component: BmcCanvasComponent;
  let fixture: ComponentFixture<BmcCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmcCanvasComponent]
    });
    fixture = TestBed.createComponent(BmcCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
