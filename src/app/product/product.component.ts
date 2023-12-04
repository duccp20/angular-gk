import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public products: any[] = []; // Biến để lưu trữ dữ liệu sản phẩm
  public errMsg: string = ''; // Biến để lưu thông báo lỗi
  public selectedProduct: any = null; // Thêm biến này để lưu sản phẩm được chọn
  public showModal: boolean = false;
  constructor(private dataService: DataService) {} // Tiêm DataService

  ngOnInit(): void {
    this.dataService.loadData().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products);
      }, // Lưu dữ liệu vào biến products
      error: (err) => (this.errMsg = err.message), // Lưu thông báo lỗi vào biến errMsg
    });
  }

  openModal(product: any) {
    console.log('product: ', product);

    this.selectedProduct = product;
    this.showModal = true;
    console.log('this.selectedProduct: ', this.selectedProduct); // Đổi ở đây
    console.log('this.showModal: ', this.showModal); // Và đổi ở đây
  }

  closeModal() {
    this.selectedProduct = null;
    this.showModal = false;
    console.log('this.selectedProduct: ', this.selectedProduct); // Đổi ở đây
    console.log('this.showModal: ', this.showModal); // Và đổi ở đây
  }
}
