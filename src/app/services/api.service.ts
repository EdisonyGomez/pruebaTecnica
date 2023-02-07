import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  contrato= 123;
  usuario='pruebasDesarrollo';
  clave= 'ClavePruebasDesarrollo2022';
  valorpagar= 20000;
  constructor(private http: HttpClient) { }


//llamada al Json que contiene la informacion de un contrato
  getInfoContrato(contrato: number, usuario: string, clave: string) {
    return this.http.get<any>("/api2", {
      params: {
        contrato: contrato,
        usuario: usuario,
        clave: clave,
      }
    });    
  }

//llamada al Json que contiene la informacion de un pago realizado
  getInfoPago(contrato: number, usuario: string, clave: string, valorpagar:number) {
    let httpHeaders = new HttpHeaders({
    'Content-type' : 'application/json',
    'cache-Control': 'no-cache'
  });

  let options = { headers: httpHeaders};

    return this.http.post<any>("/api",
    {
      contrato,
      usuario,
      clave,
      valorpagar
    },options) ;
    console.log();
  }
 
}

