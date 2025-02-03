import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root" 
}) 
export class ProductsService {

    private readonly http = inject(HttpClient);

    private readonly path = "/api/products";
    
    private readonly _products = signal<Product[]>([]);

  
    public readonly products = this._products.asReadonly();

    /**
     * Fetches the list of products from a local JSON file.
     */
    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("assets/products.json");
            }),
            tap((products) => this._products.set(products)), 
        );
    }

    /**
     * Creates a new product by sending a POST request to the API.
     * If the request fails, it returns `true` as a fallback.
     */
    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true); 
            }),
            tap(() => this._products.update(products => [product, ...products])), 
        );
    }

    /**
     * Updates an existing product using a PATCH request.
     * If the request fails, it returns `true` as a fallback.
     */
    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => {
                return of(true); 
            }),
            tap(() => this._products.update(products => {

                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    /**
     * Deletes a product by sending a DELETE request.
     * If the request fails, it returns `true` as a fallback.
     */
    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true); 
            }),
            tap(() => this._products.update(products => 
                products.filter(product => product.id !== productId) 
            )),
        );
    }
}
