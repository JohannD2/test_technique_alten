import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CartService } from '../data-access/cart.service';
import { CartItem } from '../data-access/cart.model';
import { FormsModule } from '@angular/forms';


//primeng imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private cartService = inject(CartService)

  cartItems = this.cartService.cartItems


  removeFromCart(item: CartItem): void {
 
    this.cartService.removeFromCart(item);
  }

}
