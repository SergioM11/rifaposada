import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar respuestas asincrónicas
import { catchError } from 'rxjs/operators'; // Para manejar errores

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private apiUrl = 'https://gcc.alloyservice.com/api/v2/Incidents?Status=Pending&par_fields=Ticket,Status,Stage,Summary,Service_Name,Assignee,Category,Created_Date&par_sort_desc=Created_Date';
  
  private token = 'gk7PzoHkdzaAYtk4QOkrOlaRNps3gfySWkkEWAtGyJvHnYQ602Loo3OSOLNB0J8M_FBVYRt5dIBh1L9GiMCjhjW4L8xrxWYnIe_OTpu-qBX18YCQ58wTUbUvHOOPNXwb9aZNdD8zV_HE3pV3RKEAYmBQ9mXIlRb1w8TAIJzmF44bCsWAuVrTbp0kLZF79GbAa-7vU4voV3jwEPsl2GeacFyKFrIg1qgzz8AhFMtPRtJU9flTsdYQv_efVa1lD8fB'; 


  constructor(private http: HttpClient) { }

  getIncidents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`  // Envía el token JWT en el encabezado
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        // Aquí puedes manejar los errores de la petición
        console.error('Error al obtener incidentes:', error);
        throw error; // Vuelves a lanzar el error para que sea manejado por quien llame a este método
      })
    );
  }
}
