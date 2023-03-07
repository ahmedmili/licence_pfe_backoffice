import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier-edit',
  templateUrl: './panier-edit.component.html',
  styleUrls: ['./panier-edit.component.css']
})
export class PanierEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  constructor(  private formBuilder: FormBuilder,
    private panierService: PanierService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      title:'',
      description:'',
      ancien_prix:'',
      nouveau_prix:'',
      date_debut:'',
      date_fin:'',
      quantity:'',
      image:'',
      categorie:'',
      status:'',
    });

    this.id = this.route.snapshot.params['id'];

    this.panierService.get(this.id).subscribe(
      panier => this.form.patchValue(panier)
    );
  }

  submit(): void {
    this.panierService.update(this.id, this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/paniers']));
  }

}
