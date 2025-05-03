// angular import
import { ChangeDetectionStrategy,Component, inject, ViewChild, AfterViewInit } from '@angular/core';
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-order',
  imports: [CommonModule, CardComponent, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [HttpClient, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
fileName = '';
selectedId;
submittext;
type;
isDisabled = true;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){

  }



  ngOnInit(): void {
    
    this.orderForm = this._formBuilder.group({
        // customerName: ['', Validators.required],
        // customerEmail: ['', Validators.required],
        // customerPhone: ['', Validators.required],
        customerName: [''],
        customerEmail: [''],
        customerPhone: [''],
        customerCity: [''],
        itemName: [''],
        itemWeight: [''],
        itemPurity: [''],
        metalType: [''],
        dueDate: [''],
        description: ['']
    });
    
    this.route.queryParams.subscribe(
      params => {
        console.log('Got the JWT as: ', params['id']);
        this.selectedId =  params['id'];
        this.type = params['type'];
        if(this.selectedId){
          this.getOrderItem(this.selectedId);
        }
      }
    ) 
    this.submittext = this.selectedId ? 'Update' : 'Add'
  }
  
  orderFormSubmit() {
    if (this.orderForm.valid) {
      var sendData = {
        customerName : this.orderForm.value.customerName,
        customerEmail : this.orderForm.value.customerEmail,
        customerPhone : this.orderForm.value.customerPhone,
        customerCity : this.orderForm.value.customerCity,
        itemName : this.orderForm.value.itemName,
        itemWeight: this.orderForm.value.itemWeight,
        itemPurity: this.orderForm.value.itemPurity,
        metalType: this.orderForm.value.metalType,
        dueDate: this.orderForm.value.dueDate,
        description: this.orderForm.value.description,
        updateId : this.selectedId ? this.selectedId : '',
      }
      const requestSenddata = {
        data : sendData
      }
      if(this.selectedId){
        this.OrderService.updateOrder(requestSenddata).subscribe(
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
      } else {
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
      }
    }
  }
  getOrderItem(orderId) {
    
    var sendData = {
      orderId : orderId
    }
    const requestSenddata = {
      data : sendData
    }
    this.OrderService.getOrder(requestSenddata).subscribe({
      next: (result:any)=>{
        const orderItem = result.data.data[0];
        console.log(orderItem);
        this.orderForm.patchValue({
          customerName : orderItem.customer_name,
          customerEmail : orderItem.customer_email,
          customerPhone : orderItem.customer_number,
          customerCity : orderItem.customer_city,
          itemName : orderItem.item_name,
          itemWeight: orderItem.item_weight,
          itemPurity: orderItem.item_purity,
          metalType: orderItem.metal_type,
          dueDate: orderItem.due_date,
          description: orderItem.description
        });
        if(this.type=='view'){
          this.orderForm.controls['customerName'].disable();
          this.orderForm.controls['customerEmail'].disable();
          this.orderForm.controls['customerPhone'].disable();
          this.orderForm.controls['customerCity'].disable();
          this.orderForm.controls['itemName'].disable();
          this.orderForm.controls['itemWeight'].disable();
          this.orderForm.controls['itemPurity'].disable();
          this.orderForm.controls['metalType'].disable();
          this.orderForm.controls['dueDate'].disable();
          this.orderForm.controls['description'].disable();
          
        }
      },
      error: (err:any)=> {

      },
      complete: ()=>{

      }
    });
  }
  backToList(){
    this.router.navigate(['/order-list']);
  }
  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        // const formData = new FormData();

        // formData.append("thumbnail", file);

        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    }
}
}
