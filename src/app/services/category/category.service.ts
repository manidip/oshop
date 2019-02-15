import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories').snapshotChanges().pipe(
      map(
        items => {
          return items.map( a => {
            const key = a.payload.key;
            const data = { key, ...a.payload.val() };
            return  data ;
        });
        }
      )
    );
  }
}
