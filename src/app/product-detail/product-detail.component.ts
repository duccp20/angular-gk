import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  @Input() product: any; // Dữ liệu sản phẩm được truyền vào từ component cha
  @Output() close = new EventEmitter<void>(); // Sự kiện để thông báo khi đóng modal

  closeModal(): void {
    this.close.emit(); // Phát sự kiện khi đóng modal
  }
}
