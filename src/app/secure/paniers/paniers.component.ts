import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Panier } from 'src/app/interfaces/panier';
import { PanierService } from 'src/app/services/panier.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paniers',
  templateUrl: './paniers.component.html',
  styleUrls: ['./paniers.component.css']
})
export class PaniersComponent implements OnInit {
  columns = ['ID','title', 'description','ancien_prix','nouveau_prix','date_debut','date_fin','quantity','remaining_quantity','image','categorie','status','actions'];
  dataSource = new MatTableDataSource();
  paniers: Panier[] = [];
  dataSource2!: MatTableDataSource<Panier>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private panierService:PanierService, private router:Router,private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.loadPaniers();
    this.panierService.all().subscribe(
      paniers=>
      this.dataSource.data=paniers
    );
   
  }
  
  loadPaniers() {
    this.panierService.all().subscribe((data: Panier[]) => {
      this.paniers = data;
      this.dataSource2 = new MatTableDataSource<Panier>(this.paniers);
    });
  }

  onSearch(searchValue: string) {
    this.panierService.searchPaniers(searchValue).subscribe((data: Panier[]) => {
      this.paniers = data;
      this.dataSource2 = new MatTableDataSource<Panier>(this.paniers);
    });
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