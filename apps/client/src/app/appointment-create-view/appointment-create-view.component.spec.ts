import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentCreateViewComponent } from './appointment-create-view.component';

describe('AppointmentCreateViewComponent', () => {
  let component: AppointmentCreateViewComponent;
  let fixture: ComponentFixture<AppointmentCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCreateViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
