import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() added: boolean;
  @Output() add = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    console.log('Emit eventaaa');
    this.add.emit(this.product);
  }

  onRemove(){
    this.remove.emit(this.product);
  }

}
