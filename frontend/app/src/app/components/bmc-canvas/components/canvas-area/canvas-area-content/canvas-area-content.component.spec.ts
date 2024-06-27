import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasAreaContentComponent } from './canvas-area-content.component';

describe('CanvasAreaContentComponent', () => {
  let component: CanvasAreaContentComponent;
  let fixture: ComponentFixture<CanvasAreaContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanvasAreaContentComponent]
    });
    fixture = TestBed.createComponent(CanvasAreaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
