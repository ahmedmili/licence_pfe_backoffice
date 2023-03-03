import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-paniers',
  templateUrl: './paniers.component.html',
  styleUrls: ['./paniers.component.css']
})
export class PaniersComponent implements OnInit {
  columns = ['ID','title', 'description','ancien_prix','nouveau_prix','date_dispo','quantite','image','categorie','actions'];
  dataSource = new MatTableDataSource();
  constructor(private pranierService:PanierService) { }
  ngOnInit(): void {
    this.pranierService.all().subscribe(
      paniers=>
      this.dataSource.data=paniers
    );
  }

}
