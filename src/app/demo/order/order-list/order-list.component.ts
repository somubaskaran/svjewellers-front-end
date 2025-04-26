// angular import
import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrderService } from 'src/app/theme/shared/service/order.service';
// project import

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, CardComponent, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [HttpClient]
})
export class OrderListComponent {
  orderForm: FormGroup;
  OrderService: OrderService = inject(OrderService);
  requestParam: {
    current: number;
    pasgesize: number;
    order: { direction: string; active: string };
} = {
    current: 0,
    pasgesize: 10,
    order: { direction: '', active: '' },
};
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
  ){

  }

  displayedColumns: string[] = ['id', 'customerName', 'customerEmail', 'customerNumber'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.orderForm = this._formBuilder.group({
        customerName: ['', Validators.required],
        customerEmail: ['', Validators.required],
        customerPhone: ['', Validators.required],
    });
    this.getOrderList();
  }
  getOrderList(){
    this.OrderService.getOrder(this.requestParam).subscribe({
      next: (result:any)=>{
        console.log(result.data.data);
        this.dataSource = result.data.data;
      },
      error: (err:any)=> {

      },
      complete: ()=>{

      }
    })
  }
  orderFormSubmit() {
    if (this.orderForm.valid) {
      var sendData = {
        customerName : this.orderForm.value.customerName,
        customerEmail : this.orderForm.value.customerEmail,
        customerPhone : this.orderForm.value.customerPhone,
      }
      const requestSenddata = {
        data : sendData
      }
      this.OrderService.addOrder(requestSenddata).subscribe(
          (data: any) => {
            console.log(data);
              if(data.statuscode==200){
                  // this.elements.closeAll();
                  // this.getPlayerList(this.tournmentId, this.categoryId, this.selectedTeamId.team_id);
                  // //this.getTournmentDetail(this.tournmentId, this.categoryId);
                  // this.addPlayerForm.reset();  
              } else if(data.statuscode==201) {
                  //this.showPlayerError = true;
              }
      },
      (error: any) => {
          
      });
      this.OrderService.addOrder(sendData).subscribe((response) => {
        //this.data = response;
      });
    }
  }
  addOrder(){
    this.router.navigate(['/add-order']);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
