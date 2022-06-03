import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { JwtService } from '@src/app/core/services/authentication/jwt.service';
import { CreditCardService } from '@src/app/core/services/credit-card.service';
import { ProductService } from '@src/app/core/services/product.service';
import { SimulationService } from '@src/app/core/services/simulation.service';
import { CreditCard } from '@src/app/models/credit-card';
import { Product } from '@src/app/models/product';
import { Simulation } from '@src/app/models/simulation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  productsAdded: Product[] = [];
  isLoading = false;
  simulationForm: FormGroup;
  creditCards: CreditCard[];
  constructor(
    private productService: ProductService,
    private creditCardService: CreditCardService,
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private simulationService: SimulationService,
    private router: Router,
    private toastrService: ToastrService,
    private matIconRegistry: MatIconRegistry
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.filteredProducts = products;
      this.products = products;
    });

    this.creditCardService.getCards().subscribe(products => {
      this.creditCards = products;
    });

    this.simulationForm = this.formBuilder.group({
      creditCard: [null, Validators.required],
      feeNumber: [2, Validators.required]
    })
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product => {
      return product.description.toLowerCase().includes(filterValue) ||
        product.reference.toLowerCase().includes(filterValue) ||
        product.warehouse.toLowerCase().includes(filterValue)
    })
  }

  onAdd(product: Product) {
    console.log('Triggered emit', this.productsAdded.indexOf(product));
    const index = this.productsAdded.indexOf(product);
    if (index < 0) {
      this.productsAdded.push(product);
    }
  }

  onRemove(product: Product) {
    
    console.log('Triggered delete emit');
    const index = this.productsAdded.indexOf(product, 0);
    if (index > -1) {
      this.productsAdded.splice(index, 1);
    }
  }

  checkSelection(product: Product) {
    return this.productsAdded.some((prod) => prod.id === product.id);
  }

  simulate() {
    
    if (this.simulationForm.invalid ) {
      return;
    }
    if (this.productsAdded.length < 1) {
      this.toastrService.error('Por favor selecciona al menos 1 producto', 'Ningún producto seleccionado');
      return;
    }
    const formValue = this.simulationForm.value;
    const simulation = new Simulation();
    simulation.numberOfInstallments= formValue.feeNumber;
    simulation.products = this.productsAdded;
    simulation.userId = this.jwtService.getAuthUserId();
    simulation.creditCardId = formValue.creditCard;

    this.simulationService.simulate(simulation).subscribe(response => {
      this.simulationService.simulationResult = response;
      this.simulationService.currentSimulation = simulation;
      this.router.navigate(['simulation-result']);
    });
    
  }

}
