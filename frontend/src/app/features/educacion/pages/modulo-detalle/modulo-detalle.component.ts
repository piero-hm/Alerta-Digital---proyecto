import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EducacionService, ModuloEducacion } from '../../educacion.service';
import { NavbarComponent } from '../../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';

@Component({
  selector: 'app-modulo-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './modulo-detalle.component.html',
  styleUrls: ['./modulo-detalle.component.css']
})
export class ModuloDetalleComponent implements OnInit {
  modulo: ModuloEducacion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private educacionService: EducacionService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const moduloId = Number(params.get('id'));
      if (moduloId) {
        this.modulo = this.educacionService.getModuloById(moduloId);
        if (!this.modulo) {
          // Redirigir a la lista si el módulo no se encuentra
          this.router.navigate(['/educacion']);
        }
      } else {
        this.router.navigate(['/educacion']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/educacion']);
  }
}
