import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsListComponent } from './cds-list.component';

describe('CdsListComponent', () => {
  let component: CdsListComponent;
  let fixture: ComponentFixture<CdsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
