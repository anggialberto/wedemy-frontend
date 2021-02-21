import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  ipAddress = 'http://54.254.13.200:8080/wedemy' // ibon
  // ipAddress = 'http://54.254.13.200:8080/wedemy' // anisa
  // ipAddress: string = "http://192.168.15.183:8080"; //alfi lrp

  constructor() { }
}
