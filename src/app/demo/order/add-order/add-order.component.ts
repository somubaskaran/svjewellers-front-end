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
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-add-order',
  imports: [CommonModule, CardComponent, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [HttpClient]
})
export class AddOrderComponent {
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



  ngOnInit(): void {
    this.orderForm = this._formBuilder.group({
        customerName: ['', Validators.required],
        customerEmail: ['', Validators.required],
        customerPhone: ['', Validators.required],
    });
    
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
              if(data.data.statuscode==200){
                this.router.navigate(['/order-list']);
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
  backToList(){
    this.router.navigate(['/order-list']);
  }
}
