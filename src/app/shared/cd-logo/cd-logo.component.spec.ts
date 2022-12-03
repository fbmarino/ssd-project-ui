import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CdLogoComponent} from "./cd-logo.component";

describe('CdLogoComponent', () => {
  let component: CdLogoComponent;
  let fixture: ComponentFixture<CdLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
