import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOverviewComponent } from './page-overview.component';

describe('PageOverviewComponent', () => {
  let component: PageOverviewComponent;
  let fixture: ComponentFixture<PageOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageOverviewComponent]
    });
    fixture = TestBed.createComponent(PageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
