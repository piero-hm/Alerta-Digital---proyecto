import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EducacionService, ModuloEducacion } from './educacion.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-educacion',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  modulos: ModuloEducacion[] = [];

  constructor(private educacionService: EducacionService, private router: Router) { }

  ngOnInit(): void {
    this.modulos = this.educacionService.getModulos();
  }

  verDetalleModulo(id: number): void {
    this.router.navigate(['/educacion/modulo', id]);
  }
}