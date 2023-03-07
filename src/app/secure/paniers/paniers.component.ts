import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Panier } from 'src/app/interfaces/panier';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-paniers',
  templateUrl: './paniers.component.html',
  styleUrls: ['./paniers.component.css']
})
export class PaniersComponent implements OnInit {
  columns = ['ID','title', 'description','ancien_prix','nouveau_prix','date_debut','date_fin','quantity','remaining_quantity','image','categorie','status','actions'];
  dataSource = new MatTableDataSource();
 
  constructor(private panierService:PanierService, private router:Router) { }
  ngOnInit(): void {
    this.panierService.all().subscribe(
      paniers=>
      this.dataSource.data=paniers
    );
  }

  delete(id: number): void{
    if(confirm('Are you sure ?')){
      this.panierService.delete(id).subscribe(() => {
        const newData: Panier[] = [];
        this.dataSource.data.forEach((p: unknown) => {
          if ((p as Panier).id !== id) {
            let updatedData: Panier[] = [];
            updatedData.push(p as Panier);
          }
        });
        this.dataSource.data = newData;
        this.router.navigate(['/paniers']);
      });

      
    }
  }
}