import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  readExcel(file: File): Promise<{ sheet1: any[]; sheet2: any[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the first and second sheets
        const firstSheetName = workbook.SheetNames[0];
        const secondSheetName = workbook.SheetNames[1];

        const worksheet1 = workbook.Sheets[firstSheetName];
        const worksheet2 = workbook.Sheets[secondSheetName];

        // Parse Excel data to JSON
        const jsonData1 = XLSX.utils.sheet_to_json(worksheet1, { defval: '' });
        const jsonData2 = XLSX.utils.sheet_to_json(worksheet2, { defval: '' });

        // Map data from the first sheet
        const mappedData1 = jsonData1.map((row: any) => ({
          numeroEmpleado: row['Num emp'] || '',
          name: row['Nombre'] || '',
          email: row['Correo Electronico'] || '',
        }));

        // Map data from the second sheet
        const mappedData2 = jsonData2.map((row: any) => ({
          prizeName: row['Artículo'] || '',
          prizeNum: row['Número de regalo'] || '',
        }));

        // Resolve both datasets
        resolve({ sheet1: mappedData1, sheet2: mappedData2 });
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}
