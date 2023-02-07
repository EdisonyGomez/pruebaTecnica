export interface Contrato {
    DATA: Data;
}

 interface Data {
    DIRECCION:           string;
    FECHA_LIMITE_PAGO:   Date;
    FECHA_OPORTUNA_PAGO: Date;
    FACTCODI:            number;
    CODIGO_USUARIO:      number;
    IRREGULARIDAD:       string;
    PAGO_MINIMO:         number;
    CICLO:               number;
    ESTADO_CONEXION:     string;
    SUSCNAME:            string;
    DEUDA_ANTERIOR:      number;
    ATRASOS:             number;
    DEUDA_TOTAL:         number;
}
