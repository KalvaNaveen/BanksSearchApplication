import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
 banks;
  constructor(
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    //Creating  new ARRAY Object Which is contains single Bank along with its all Branch Details based on  bank_Id
    this.route.paramMap.subscribe(params => {
          this.banks=JSON.parse(localStorage['bankDada']).filter(a=>{return a.bank_id === +params.get('bank_id')}).map(newData=> newData);
      });
  }

}
