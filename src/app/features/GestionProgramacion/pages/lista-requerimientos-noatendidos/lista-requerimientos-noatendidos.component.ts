import { Component, OnInit } from '@angular/core';
import { ProgramacionService } from '../../services/programacion.service';
import { RequerimientoResumenDto } from '../../models/RequerimientoResumenDto';

@Component({
    selector: 'app-lista-requerimientos-noatendidos',
    templateUrl: './lista-requerimientos-noatendidos.component.html',
    standalone: false,
    styleUrls: ['./lista-requerimientos-noatendidos.component.css']
})

export class ListaRequerimientosComponent implements OnInit {
    dataOriginal: RequerimientoResumenDto[] = [];
    data: RequerimientoResumenDto[] = [];
    filterTerm = '';

    constructor(private programacionService: ProgramacionService) {}

    ngOnInit(): void {
        this.programacionService.getRequerimientosPendientesTabla().subscribe(requerimientos => {
            this.dataOriginal = requerimientos;
            this.applyFilter();
        });
    }

    onFilterChange(term: string) {
        this.filterTerm = term;
        this.applyFilter();
    }

    private applyFilter() {
        const t = this.filterTerm.toLowerCase();
        this.data = !t
            ? this.dataOriginal
            : this.dataOriginal.filter(r => `${r.id}`.toLowerCase().includes(t));
    }
}