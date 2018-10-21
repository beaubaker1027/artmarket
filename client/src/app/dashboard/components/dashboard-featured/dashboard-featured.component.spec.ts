import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFeaturedComponent } from './dashboard-featured.component';

describe('DashboardFeaturedComponent', () => {
  let component: DashboardFeaturedComponent;
  let fixture: ComponentFixture<DashboardFeaturedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFeaturedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
