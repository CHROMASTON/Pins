import { inject, Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map,throwError } from 'rxjs';

type RegionCountryData = {
  [key: string]: {
    country: string;
    region: string;
  };
};

type ApiResponse = {
  status: string;
  data: RegionCountryData;
};

@Injectable({
  providedIn: 'root'
})
export class CountryRegionService {

  httpClient=inject(HttpClient)
  regionList=signal<{key:string,value:string}[]>([])

  constructor() { }


  getRegions(){
    return this.httpClient.get<ApiResponse>('https://api.first.org/data/v1/countries').pipe(
      map((response:ApiResponse)=>{
          let filteredRegion=Object.values(response.data).map((item)=>item.region)
          let filteredCountries=Object.entries(response.data).map(([key,value])=>{return{value:key,key:value.country,region:value.region}})
          const oprtionList =[...new Set(filteredRegion)].map((i)=>{return {key:i,value:i}})
          return {oprtionList,response:filteredCountries}
          

        }
      ),
      catchError((err)=>{

        if(err instanceof Error){

          return throwError(()=>new Error(err.message))

        }
        return throwError(()=>new Error('Error while fetching the Regions'))


      })

    )
  }
}
