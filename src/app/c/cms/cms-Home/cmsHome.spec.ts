import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabela1Component } from './cmsHome.component';

describe('Tabela1Component', () => {
  let component: Tabela1Component;
  let fixture: ComponentFixture<Tabela1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabela1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tabela1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
