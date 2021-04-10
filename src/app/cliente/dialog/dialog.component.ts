import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';
import { ApiclienteService } from 'src/app/services/apicliente.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public nombre!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public apiCliente: ApiclienteService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) { 
    if (this.cliente !== null) {
      this.nombre = cliente.nombre;
    }
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  editCliente(){
    const cliente: Cliente = { nombre: this.nombre, id: this.cliente.id };
    this.apiCliente.edit(cliente).subscribe(response => {
      if (response.exito === 1) {
        this.dialogRef.close();
        this.snackBar.open('Cliente modificado con exito','',{
          duration: 2000
        });
      }
    });
  }

  addCliente() {
    const cliente: Cliente = { id: 0, nombre: this.nombre };
    this.apiCliente.add(cliente).subscribe(response => {
      if (response.exito === 1) {
        this.dialogRef.close();
        this.snackBar.open('Cliente insertado con exito','',{
          duration: 2000
        });
      }
    });
  }

}
