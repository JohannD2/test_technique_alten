import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from './cart.model';
import { Product } from 'app/products/data-access/product.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Manage state with signals
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() => this.cartItems()
  .reduce((accQty, item)=> accQty + item.quantity, 0)
)

  //Add item to cart method

  addToCart(product: Product): void {
    this.cartItems.update(items =>[...items, {product, quantity: 1}])
  }


  //remove item to cart method

   removeFromCart(cartItem: CartItem): void {
    this.cartItems.update(items =>
      items.filter(item => item.product.id !== cartItem.product.id));
  }

}
