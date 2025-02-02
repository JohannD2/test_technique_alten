import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact.model';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 

  constructor(private http: HttpClient) { }
  

  sendContact(contactData: Contact): Observable<{ response: string }> {
    return of({ message: "Message envoyé avec succès !" }).pipe(
      delay(1000), // Simule un délai réseau
      map((data) => ({ response: data.message }))
    );
  }
}
