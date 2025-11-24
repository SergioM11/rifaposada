import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'; // Ensure this is imported
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [HttpClientModule, FormsModule, MatTableModule],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'], // Fixed plural key
})
export class IncidentsComponent implements OnInit {
  // Define table data
  dataSource: Array<Record<string, any>> = [];

  displayedColumns: string[] = [
    'Ticket',
    'submitdate',
    'Requester',
    'Summary',
    'Status',
    'Assignee',
    'Assignee_Group',
    'Priority',
    'Due_Date',
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('Incidents Component Initialized');
    this.fetchWorkOrders();
  }
  // const apiUrl =
  // '/api/v2/Work%20Orders?par_fields=Ticket,Status,Stage,Submit_Date,Requester,Summary,Service_Name,Assignee,Assignee_Group,Priority,Due_Date&par_sort_desc=Due_Date';

  fetchWorkOrders(): void {
    const apiUrl =
      '/api/v2/Work%20Orders?par_fields=Ticket,Status,Stage,Submit_Date,Requester,Summary,Service_Name,Assignee,Assignee_Group,Priority,Due_Date&par_sort_desc=Due_Date';
    const token =
      'qoRVbVa91vyPXCXN8nym45ExYh-3cK5b1FsZ91fIoRCBpDsOOlTerrPmSa-R7ItMuPHyEsSYB_H9sFA1TQwioC0CgLY8PyDXQuRaKlnZEAo9r-grpFjA2vDI_6ryW25T0jw1zYeuy4QKfTsr_shOo81_61cjKJyq4mE0vhQyoUL7_eQUqDjdDqvKGfUaIxqlwgc6c73W_yDDrPUgqpzwC0_45iuLj7tYb_VYfWRO1lY';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get(apiUrl, { headers, responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('Raw Response as Text:', response);
    
        try {
          const parsedResponse = JSON.parse(response); // Attempt to parse as JSON
          console.log('Parsed JSON:', parsedResponse);
    
          if (parsedResponse.success && parsedResponse.responseObject) {
            const fields: string[] = parsedResponse.responseObject.Fields.map(
              (field: any) => field.Name
            );
            const processedData: Array<Record<string, any>> = [];
    
            parsedResponse.responseObject.Data.forEach((row: any) => {
              const rowData: Record<string, any> = {};
              fields.forEach((field, index) => {
                rowData[field] = row[index] || null;
              });
              processedData.push(rowData);
            });
    
            this.dataSource = processedData;
          } else {
            console.error('Unexpected Parsed Response:', parsedResponse);
          }
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      },
      (error) => {
        console.error('Error fetching work orders (as text):', error);
      }
    );
    
    
    
  }


}
