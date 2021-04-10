import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../models/cliente';
import { DialogdeleteComponent } from '../common/dialogdelete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public lst!: any[];

  public columnas: string[] = ['id', 'nombre', 'actions'];

  readonly width: string = '300px';

  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { 

  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.apiCliente.getCliente().subscribe( response => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialodRef = this.dialog.open(DialogComponent, {
      width: this.width
    });
    dialodRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  openEdit(cliente: Cliente){
    const dialodRef = this.dialog.open(DialogComponent, {
      width: this.width, 
      data: cliente
    });
    dialodRef.afterClosed().subscribe(result => {
      this.getClientes();
    });
  }

  delete(cliente: Cliente){
    const dialodRef = this.dialog.open(DialogdeleteComponent, {
      width: this.width, 
    });
    dialodRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiCliente.delete(cliente.id).subscribe(response => {
          if (response.exito === 1) {
            this.snackBar.open('Cliente eliminado con exito','',{
              duration: 2000
            });
            this.getClientes();
          }
        });
      }
    });
  }
}
