import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../app.component';


@Component({
  selector: 'app-child',
  templateUrl: 'child.component.html',
  styleUrls: ['child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() product: Product;
  @Output() duplicateProduct: EventEmitter<Product>;

  constructor() {
    this.duplicateProduct = new EventEmitter<Product>();
  }

  ngOnInit(): void {
    console.log(this.product);
  }

  onDuplicateProduct(): void {
    this.duplicateProduct.emit({code: 'CA001*', name: 'Tesla*', category: 'cars', quantity: 0});
  }
}
