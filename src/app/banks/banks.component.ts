import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {cities} from '../cities';
import {ApiService} from '../service/api.service';

export interface BanksList {
  bank_name: string;
  branch: string;
  ifsc: string;
  address: string;
  city: string;
}

const CACHE_BANK_KEY ='bankDada',CACHE_CITY_KEY = 'City';
@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})

export class BanksComponent implements OnInit {

  cities=cities;
  selectedCity='NEW DELHI';
  isLoading=false;  
  displayedColumns: string[] = ['select','bank_name', 'branch', 'ifsc','city','address' /*,'district','state'*/];
  dataSource: MatTableDataSource<BanksList>;
  constructor(private api: ApiService) {
  }

   // On Initializtion time( Browser load or Application start) it will check localstorage first and then it calls to APISERVICE...................................
  ngOnInit() {
    let city = localStorage[CACHE_CITY_KEY];
    let banks = JSON.parse(localStorage[CACHE_BANK_KEY]!=='undefined'?localStorage[CACHE_BANK_KEY]:'[]');
    if(banks.length >0){
      this.selectedCity =  city;
      this.LoadBankDetails(banks);
    }
    else{
      this.getBanks();

    }
  }

  // To call API using APISERVICE AND HTTP...................................
  getBanks () {
    this.isLoading = true;
    this.api.fetchBanksData(this.selectedCity).subscribe(fetchedData=>{this.LoadBankDetails(fetchedData)});
  }
  // To Load table after fetching data using API or Local Storage & its a Generic Function...................................
  LoadBankDetails(banks){
    this.dataSource = new MatTableDataSource(banks);
    this.isLoading = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    localStorage[CACHE_CITY_KEY]=this.selectedCity;     
    localStorage[CACHE_BANK_KEY]=JSON.stringify(banks);
  }
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  // To Search data in all fields ....................................
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  selection = new SelectionModel<BanksList>(true, []);
 
  // To select or deselect favourite Banks and save those in localStorage to prevent state after refresh or hardreload....................................
  selectRow($event, row) {
    let localCachedData = JSON.parse(localStorage[CACHE_BANK_KEY]||'[]');
     if ($event.checked) {
          for(let [i,element] of localCachedData.entries()){
            if(element.ifsc === row.ifsc){
              localCachedData[i].favourite = $event.checked;
              localStorage[CACHE_BANK_KEY]=JSON.stringify(localCachedData);
            }
          }      
     }
     else{
      for(let [i,element] of localCachedData.entries()){
        if(element.ifsc === row.ifsc){
          localCachedData[i].favourite = $event.checked;
          localStorage[CACHE_BANK_KEY]=JSON.stringify(localCachedData);
        }
      }
    }
  }

}
