import { Injectable } from '@angular/core';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private data: Map<string, any> = new Map();
  public fingerPrint: string = '';
  constructor() {
    window['dataStore'] = this.data;
  }

  public setValue(key: string, value: any) {
    this.fingerPrint = uuid();
    this.data.set(key, value);
  }
  public getValue(key: string) {
    return this.data.get(key);
  }
  public removeValue(key: string) {
    this.fingerPrint = uuid();
    this.data.delete(key);
  }

}
