import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Diretiva } from './diretiva';

describe('Diretiva', () => {
  let component: Diretiva;
  let fixture: ComponentFixture<Diretiva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diretiva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Diretiva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
