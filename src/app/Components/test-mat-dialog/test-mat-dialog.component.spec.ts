import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMatDialogComponent } from './test-mat-dialog.component';

describe('TestMatDialogComponent', () => {
  let component: TestMatDialogComponent;
  let fixture: ComponentFixture<TestMatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestMatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
