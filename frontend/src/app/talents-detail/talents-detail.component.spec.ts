import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentsDetailComponent } from './talents-detail.component';

describe('TalentsDetailComponent', () => {
  let component: TalentsDetailComponent;
  let fixture: ComponentFixture<TalentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
