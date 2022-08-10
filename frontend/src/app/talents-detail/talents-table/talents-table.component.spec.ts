import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentsTableComponent } from './talents-table.component';

describe('TalentsTableComponent', () => {
  let component: TalentsTableComponent;
  let fixture: ComponentFixture<TalentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
