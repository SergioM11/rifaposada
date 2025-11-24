import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  readExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
  
        // Parse Excel to JSON and ensure empty cells have default values
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  
        // Skip the first row (headers)
        const filteredData = jsonData.slice(1);
  
        // Map column names to desired field names
        const mappedData = filteredData.map((row: any) => ({
          first_name: row['Column1.1'] || '', // Map Column1.1 to first_name
          second_name: row['Column1.2'] || '', // Map Column1.2 to second_name
          last_name: row['Column1.3'] || '', // Map Column1.3 to last_name
          second_last_name: row['Column1.4'] || '', // Map Column1.4 to second_last_name
          email: row['Column1.5'] || '', // Map Column1.5 to email
        }));
  
        console.log('Mapped Data (Excluding First Row):', mappedData);
        resolve(mappedData);
      };
  
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
  
}
