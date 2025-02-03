import { Component, OnInit, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";

import { CartService } from "app/cart/data-access/cart.service";

// PrimeNG UI components for styling and interactivity
import { ButtonModule } from "primeng/button";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

// Define an empty product template for initialization
const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, ButtonModule, DialogModule, ProductFormComponent, TagModule, CommonModule, DividerModule, DropdownModule],
})

export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  private cartService = inject(CartService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);


  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  ngOnInit() {
    // Fetch the products list from the service
    this.productsService.get().subscribe();

    // Define sorting options for the product list
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  // Handles sorting changes
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1; 
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1; 
        this.sortField = value;
    }
  }

  // Determines the severity
  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return "info";
    }
  }

  // Opens the product creation dialog
  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  // Opens the product edit dialog
  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  // Deletes a product by calling the service
  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  // Saves the product 
  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  // Cancels editing and closes the dialog
  public onCancel() {
    this.closeDialog();
  }

  // Closes dialog window
  private closeDialog() {
    this.isDialogVisible = false;
  }

  // Adds a product to cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
