import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

/**
 * Standalone Products table component (admin)
 * - No external service required; data is in-memory
 * - Replaced PrimeNG Dropdown with native <select> using FormsModule/ngModel
 */

interface Product {
  id?: string;
  code?: string;
  name?: string;
  image?: string;
  images?: string[];
  price?: number;
  category?: string;
  brand?: string;
  status?: string; // INSTOCK | LOWSTOCK | OUTOFSTOCK
  stock?: number;
  description?: string;
  totalRatings?: number;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-products-table',
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToolbarModule,
    RatingModule,
    TagModule,
    FileUploadModule,
    RippleModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class Products implements OnInit {
  @ViewChild('dt') dt!: Table;

  products: Product[] = [];

  productDialog: boolean = false;
  product: Product = {};
  selectedProducts: Product[] | null = null;
  submitted: boolean = false;

  statuses = [
    { label: 'INSTOCK', value: 'INSTOCK' },
    { label: 'LOWSTOCK', value: 'LOWSTOCK' },
    { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' }
  ];

  cols: Column[] = [];
  exportColumns: { title: string; dataKey: string }[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initColumns();
    this.loadInitialData();
  }

  initColumns() {
    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' }
    ];

    this.exportColumns = this.cols.map((c) => ({ title: c.header, dataKey: c.field }));
  }

  loadInitialData() {
    // In-memory sample data. Replace with your model/service later.
    this.products = [
      {
        id: 'A1B2C',
        code: 'P-001',
        name: 'Wireless Headphones Pro',
        image: 'assets/images/product-placeholder-1.jpg',
        images: ['assets/images/product-placeholder-1.jpg', 'assets/images/product-placeholder-1-2.jpg'],
        price: 4999,
        category: 'Audio',
        brand: 'Acme Audio',
        status: 'INSTOCK',
        stock: 25,
        description: 'Premium wireless headphones with ANC.',
        totalRatings: 128
      },
      {
        id: 'D4E5F',
        code: 'P-002',
        name: 'Ergonomic Office Chair',
        image: 'assets/images/product-placeholder-2.jpg',
        images: [
          'assets/images/product-placeholder-2.jpg',
          'assets/images/product-placeholder-2-2.jpg',
          'assets/images/product-placeholder-2-3.jpg'
        ],
        price: 12999,
        category: 'Furniture',
        brand: 'ComfortPlus',
        status: 'LOWSTOCK',
        stock: 8,
        description: 'Adjustable ergonomic chair.',
        totalRatings: 54
      }
    ];

    // Ensure change detection picks this up if needed
    this.cd.markForCheck();
  }

  exportCSV() {
    if (this.dt) this.dt.exportCSV();
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(p: Product) {
    this.product = { ...p };
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    if (!this.selectedProducts || this.selectedProducts.length === 0) return;

    this.confirmationService.confirm({
      message: `Are you sure you want to delete the selected products? (${this.selectedProducts.length})`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000
        });
      }
    });
  }

  deleteProduct(p: Product) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${p.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== p.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000
        });
      }
    });
  }

  saveProduct() {
    this.submitted = true;

    if (!this.product.name || !this.product.name.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Name is required',
        life: 2500
      });
      return;
    }

    if (this.product.id) {
      const idx = this.products.findIndex((p) => p.id === this.product.id);
      if (idx > -1) this.products[idx] = { ...this.product };
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    } else {
      this.product.id = this.createId();
      this.product.image = this.product.image || 'assets/images/product-placeholder.svg';
      this.products.push({ ...this.product });
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    }

    this.products = [...this.products]; // refresh table
    this.productDialog = false;
    this.product = {};
  }

  findIndexById(id?: string) {
    if (!id) return -1;
    return this.products.findIndex((p) => p.id === id);
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status?: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }
}