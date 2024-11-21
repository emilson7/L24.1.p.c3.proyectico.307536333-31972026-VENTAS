import Cl_venta from "./Cl_venta.js";
export default class Cl_tienda {
    constructor(montoCaja, porcIncremento) {
        this.montoCaja = montoCaja;
        this.porcIncremento = porcIncremento;
        this.ventas = [];
    }
    set montoCaja(montoCaja) {
        this._montoCaja = +montoCaja;
    }
    get montoCaja() {
        return this._montoCaja;
    }
    set porcIncremento(porcIncremento) {
        this._porcIncremento = +porcIncremento;
    }
    get porcIncremento() {
        return this._porcIncremento;
    }
    agregarVenta(cliente, factura, costo, cnArticulos) {
        let venta = new Cl_venta(cliente, factura, costo, cnArticulos, this.porcIncremento);
        this.ventas.push(venta);
    }
    modificarVenta(cliente, agregarVenta) {
        let inVenta = -1;
        for(let i=0; i < this.ventas.length; i++) {
            if(this.ventas[i].cliente == cliente) {
                inVenta = i;
            }
        }
        if(inVenta !== -1) {
            this.ventas.splice(inVenta, 1, agregarVenta);
        }
        return inVenta !== -1;
    }
    eliminarVenta(factura) {
        let inVenta = -1;
        for(let i=0; i < this.ventas.length; i++) {
            if(this.ventas[i].factura == factura) {
                inVenta = i;
            }
        }
        if(inVenta !== -1) {
            this.ventas.splice(inVenta, 1);
        }
        return inVenta !== -1;
    }
    mayorMonto() {
        let mayorMonto = this.ventas[0].costodeVenta();
        for(let i=0; i < this.ventas.length; i++) {
            if(this.ventas[i].costodeVenta() > mayorMonto) {
                mayorMonto = this.ventas[i].costodeVenta();
            }
        }
        return mayorMonto;
    }
    montoFinalCaja() {
        let montoFinalCaja = this.montoCaja;
        this.ventas.forEach((venta) => {montoFinalCaja += venta.costodeVenta()});
        return montoFinalCaja;
    }
    clientesMontoMayor() {
        let clientesMayorMonto = this.mayorMonto();
        return this.ventas.filter((venta) => venta.costodeVenta() == clientesMayorMonto);
    }
    clientesSoloUnArt() {
        let clientesUnArt = this.ventas.filter((venta) => venta.cnArticulos == 1);
        if(this.ventas.filter((venta) => venta.cnArticulos == 1))
            return clientesUnArt;
        }
}