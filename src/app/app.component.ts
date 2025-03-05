import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductsService } from './products.service';
import { GraphQLService } from './graphql.service';
import { ApolloClient } from '@apollo/client/core';
import { ApolloClientService } from './apollo-client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  apolloClient!: ApolloClient<any>;
  title = 'linkedListTestingCart';
  productsService: any;
  products: Product[] = [];
  users: any[] = [];
  name: string = '';
  email: string = '';

  constructor(
    private graphqlService: GraphQLService,
    productsService: ProductsService,
    private apolloService: ApolloClientService,
    private cdr: ChangeDetectorRef
  ) {
    this.productsService = productsService;
    this.products = productsService.products;
  }

  ngOnInit() {
    this.apolloClient = this.apolloService.createApolloClient();

    // Fetch users data and assign to 'users' array
    this.graphqlService.getUsers().subscribe((result: any) => {
      console.log('GraphQL Users:', result.data);
      this.users = result.data.users; // Assign the result to the 'users' array
    });
  }

  // Add product to the cart
  addToCart(product: Product): void {
    this.productsService.cart.update((cart: any) => {
      const updatedCart = {
        products: [...cart.products, product], // Add product to cart
        total: cart.total + product.price, // Update total price
      };
      return updatedCart;
    });
  }

  // Remove product from the cart
  removeFromCart(productId: number): void {
    this.productsService.cart.update((cart: any) => {
      const updatedProducts = cart.products.filter(
        (product: Product) => product.id !== productId
      );
      const updatedTotal = updatedProducts.reduce(
        (sum: number, product: Product) => sum + product.price,
        0
      );
      return {
        products: updatedProducts,
        total: updatedTotal,
      };
    });
  }

  // Method to get the total value from the cart
  getTotal(): number {
    return this.productsService.cart().total;
  }

  addUser(name: string, email: string) {
    console.log('Sending addUser mutation with:', { name, email });

    this.graphqlService.addUser(name, email).subscribe({
      next: (newUser) => {
        console.log('User added successfully:', newUser);
        this.users = [...this.users, newUser]; // Create new array with added user
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error adding user:', error);
      },
    });
  }

  deleteUser(id: string): void {
    console.log('Delete User mutation with:', { id });

    this.graphqlService.deleteUser(id).subscribe({
      next: (response) => {
        console.log('User deleted successfully:', response);
        this.users = this.users.filter((user) => user.id !== id);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }
}
