import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ApiService } from './services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Contrato } from './models/contrato';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'prueba_tecnica';
    formContrato:  FormGroup;
    formPago:  FormGroup;
    formContratoModal:  FormGroup;
    closeResult: string = '';
    loading = false; 
    respuestaServidor: any = '';
    constructor(private apiService:ApiService, private fb: FormBuilder,
                private modalService: NgbModal,) {
        this.formContrato = this.fb.group({
            contrato: ['', Validators.required],
            usuario: ['', Validators.required],
            clave: ['', Validators.required]               
          });
          this.formPago = this.fb.group({
            contrato: ['', Validators.required],
            usuario: ['', Validators.required],
            clave: ['', Validators.required],
            valorpagar: ['', ]               
          });
          this.formContratoModal = this.fb.group({
            DIRECCION: ['', Validators.required],
            FECHA_LIMITE_PAGO: ['', Validators.required],
            FECHA_OPORTUNA_PAGO: ['', Validators.required],
            FACTCODI: ['', ],
            CODIGO_USUARIO: ['', ],
            IRREGULARIDAD: ['', ],
            PAGO_MINIMO: ['', ],
            CICLO: ['', ],
            ESTADO_CONEXION: ['', ],
            SUSCNAME: ['', ],       
            DEUDA_ANTERIOR: ['', ],
            ATRASOS: ['', ],
            DEUDA_TOTAL: ['', ],
          });
    }

    ngOnInit() {
     
    }

    onSubmit(){
        this.apiService.getInfoContrato(this.formContrato.value.contrato, 
                                this.formContrato.value.usuario,
                                this.formContrato.value.clave).
                                subscribe((resp:Contrato) => {       
                                  this.formContratoModal.patchValue({
                                    DIRECCION: resp.DATA.DIRECCION,
                                    FECHA_LIMITE_PAGO: resp.DATA.FECHA_LIMITE_PAGO,
                                    FECHA_OPORTUNA_PAGO: resp.DATA.FECHA_OPORTUNA_PAGO,
                                    FACTCODI: resp.DATA.FACTCODI,
                                    CODIGO_USUARIO: resp.DATA.CODIGO_USUARIO,
                                    IRREGULARIDAD: resp.DATA.IRREGULARIDAD,
                                    PAGO_MINIMO: resp.DATA.PAGO_MINIMO,
                                    CICLO: resp.DATA.CICLO,
                                    ESTADO_CONEXION:resp.DATA.ESTADO_CONEXION,
                                    SUSCNAME:resp.DATA.SUSCNAME,
                                    DEUDA_ANTERIOR:resp.DATA.DEUDA_ANTERIOR,
                                    ATRASOS:resp.DATA.ATRASOS,
                                    DEUDA_TOTAL: resp.DATA.DEUDA_TOTAL
                                  }),
                                  console.log(resp);
                                // })
                              })
    }

    onSubmitPago(){
      this.apiService.getInfoPago(this.formPago.value.contrato, 
                              this.formPago.value.usuario,
                              this.formPago.value.clave,
                              this.formPago.value.valorpagar).
                              subscribe((resp) => {       
                              this.respuestaServidor =resp.ERROR;
                                console.log(resp);
                              // })
                            });
  }

    
  //Funcion que personaliza  y permite visualizar el modal
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',
                                     "size": "lg",
                                      centered: true,
                                      backdrop: true,
                                      animation: true,
                                      keyboard: true,
                                      backdropClass: "modal-backdrop"  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  
  /**
   * Write code on Method
   *
   * @return response()
   */
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } 
}