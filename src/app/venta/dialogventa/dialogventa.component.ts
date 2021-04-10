import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Concepto } from 'src/app/models/concepto';
import { Venta } from 'src/app/models/venta';
import { ApiventaService } from 'src/app/services/apiventa.service';

@Component({
  selector: 'app-dialogventa',
  templateUrl: './dialogventa.component.html',
  styleUrls: ['./dialogventa.component.scss']
})
export class DialogventaComponent implements OnInit {

  public venta!: Venta;
  public conceptos!: Concepto[];

  public conceptoForm = this.formBuilder.group({
    cantidad: [2, Validators.required],
    importe: [3, Validators.required],
    idProducto: [1, Validators.required]
  })

  constructor(
    public dialogRef: MatDialogRef<DialogventaComponent>,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public apiVenta: ApiventaService
  ) {
    this.conceptos = [];
    this.venta = {idCliente: 3, conceptos: []};
   }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  addConcepto() {
    this.conceptos.push(this.conceptoForm.value);
  }

  addVenta(){
    this.venta.conceptos = this.conceptos;
    this,this.apiVenta.add(this.venta).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open('Venta echa con exito', '', {
          duration : 2000
        });
    })
  }

}
