import { Component, OnInit } from '@angular/core';
import { ExcelService } from './excel.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Include Notyf styles



import { trigger, state, style, animate, transition } from '@angular/animations';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('giftOpenAnimation', [
      // Initial state before the gift is "opened"
      state('closed', style({
        transform: 'scale(1) rotate(0deg)',
        opacity: 1,
        backgroundColor: '#FF2D2D', // Red color for the gift box
      })),
      // State when the gift is "opened"
      state('opened', style({
        transform: 'scale(1.2) rotate(180deg)', // Opened state with scaling and rotating
        opacity: 1,
        backgroundColor: '#FFDD00', // Yellow for the open box
      })),
      // Transition between the states
      transition('closed => opened', [
        animate('1s ease-out')
      ]),
      transition('opened => closed', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  prizes: any[] = [];
  sortingUsers: any[] = [];
  filteredUsers: any[] = [];
  emailFilter: string = '';
  selectedEmail: string = '';
  selectedName: string = '';
  selectedUser: any = null;
  swal: any;
  private notyf = new Notyf();
  
  constructor(private excelService: ExcelService) {}

  ngOnInit(): void {
    const savedUsers = localStorage.getItem('users');
    this.sortingUsers = JSON.parse(localStorage.getItem('sortingUsers') || '[]');
    // this.sortingUsers = JSON.parse(localStorage.getItem('sortingUsers') || '[]');
  
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
      this.filteredUsers = [...this.users];
      console.log('Loaded Users from LocalStorage:', this.users);
    } else {
      console.log('No users found in LocalStorage');
      this.filteredUsers = [];
    }


   
  };
  // ngAfterViewInit(): void {

  //   console.log("jalando")

  //   const snowContainer = document.querySelector(".snow-container");

  //   const particlesPerThousandPixels = 0.1;
  //   const fallSpeed = 1.25;
  //   const pauseWhenNotActive = true;
  //   const maxSnowflakes = 200;
  //   const snowflakes = [];

  //   let snowflakeInterval: any;
  //   let isTabActive = true;

  //   function resetSnowflake(snowflake:any) {
  //       const size = Math.random() * 5 + 1;
  //       const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
  //       const viewportHeight = window.innerHeight;

  //       snowflake.style.width = `${size}px`;
  //       snowflake.style.height = `${size}px`;
  //       snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
  //       snowflake.style.top = `-${size}px`;

  //       const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
  //       snowflake.style.animationDuration = `${animationDuration}s`;
  //       snowflake.style.animationTimingFunction = "linear";
  //       snowflake.style.animationName =
  //           Math.random() < 0.5 ? "fall" : "diagonal-fall";

  //       setTimeout(() => {
  //           if (parseInt(snowflake.style.top, 10) < viewportHeight) {
  //               resetSnowflake(snowflake);
  //           } else {
  //               snowflake.remove(); // Remove when it goes off the bottom edge
  //           }
  //       }, animationDuration * 1000);
  //   }

  //   function createSnowflake() {
  //       if (snowflakes.length < maxSnowflakes) {
  //           const snowflake = document.createElement("div");
  //           snowflake.classList.add("snowflake");
  //           snowflakes.push(snowflake);
  //           console.log("agregar:: ", snowflake)
  //           if(snowContainer)
  //           snowContainer.appendChild(snowflake);
  //           resetSnowflake(snowflake);
  //       }
  //   }

  //   function generateSnowflakes() {
  //       console.log("Im here")
  //       const numberOfParticles =
  //           Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
  //           particlesPerThousandPixels;
  //       const interval = 5000 / numberOfParticles;

  //       clearInterval(snowflakeInterval);
  //       snowflakeInterval = setInterval(() => {
  //           if (isTabActive && snowflakes.length < maxSnowflakes) {
  //               requestAnimationFrame(createSnowflake);
  //           }
  //       }, interval);
  //   }

  //   function handleVisibilityChange() {
  //       console.log("Algo")
  //       if (!pauseWhenNotActive) return;

  //       isTabActive = !document.hidden;
  //       if (isTabActive) {
  //           generateSnowflakes();
  //       } else {
  //           clearInterval(snowflakeInterval);
  //       }
  //   }

  //   generateSnowflakes();

  //   window.addEventListener("resize", () => {
  //       clearInterval(snowflakeInterval);
  //       setTimeout(generateSnowflakes, 1000);
  //   });

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  // }
  
  
  
    
  
  


  
    
  
  giftState: string = 'closed';
  openGift() {
    this.giftState = 'opened';
    setTimeout(() => {
      // Optionally reset back to the closed state after 2 seconds
      this.giftState = 'closed';
    }, 2000); // Revert the gift back after 2 seconds
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.excelService.readExcel(file).then((data) => {
        // Process Sheet 1 (Users)
        this.users = data.sheet1.map((row: any) => ({
          numeroEmpleado: row.numeroEmpleado,
          name: row.name,
          email: row.email,
        }));
        this.filteredUsers = [...this.users];
        console.log('Filtered Users Array:', this.users);
  
        // Store users in localStorage
        localStorage.setItem('users', JSON.stringify(this.users));
  
        // Process Sheet 2 (Prizes)
        this.prizes = data.sheet2.map((row: any) => ({
          prizeName: row.prizeName,
          prizeNum: row.prizeNum,
        }));
        console.log('Prizes Array:', this.prizes);
  
        // Store prizes in localStorage (optional)
        localStorage.setItem('prizes', JSON.stringify(this.prizes));
      });
    }
  }
  

  saveSelectedUser(): void {
    const savedUsers = localStorage.getItem('users');
    if (!savedUsers) {
      alert('No users found in the system.');
      return;
    }

    const usersFromStorage = JSON.parse(savedUsers);

    const selectedUser = usersFromStorage.find((user: any) => user.email === this.selectedEmail);

    if (selectedUser) {
      console.log('Selected User:', selectedUser);

      const updatedUsers = usersFromStorage.filter((user: any) => user.email !== this.selectedEmail);

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      this.users = updatedUsers;
      this.filteredUsers = [...this.users];
      this.selectedUser = selectedUser;
      this.selectedName ="${selectedUser.name}";
      if(!this.sortingUsers.find(user=>user.email === selectedUser.email)){
        this.sortingUsers.push(selectedUser);

        console.log("Usuarios Participando: ", this.sortingUsers)}
        else{
        console.log("Usuario ya esta participando")
        }
        localStorage.setItem('sortingUsers', JSON.stringify(this.sortingUsers));

        this.notyf.success(`¡Usuario ${selectedUser.name} registrado para la rifa con éxito!`);
      this.emailFilter = "";
      this.selectedEmail = "";
    } else {
      alert('Por favor, selecciona un correo electrónico válido.');
    }


  }
  clearSortingUsers() {
    this.sortingUsers = []; 
    localStorage.removeItem('sortingUsers');

    console.log('LocalStorage cleared');
    console.log('Sorting users cleared:', this.sortingUsers);
  }
  
  clearLocalStorage(): void {
    localStorage.removeItem('users');
    this.users = [];
    this.filteredUsers = [];
    console.log('LocalStorage cleared');
  }

  filterEmails(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.email.toLowerCase().includes(this.emailFilter.toLowerCase())
    );
  }

  selectEmail(email: string): void {
    this.selectedEmail = email;
    
    console.log('Selected Email:', this.selectedEmail);
    const selectedUser = this.users.find((user: any) => user.email === this.selectedEmail);
    this.selectedName = selectedUser.name;
    // if(!this.sortingUsers.find(user=>user.email === selectedUser.email)){
    // this.sortingUsers.push(selectedUser);
    // console.log("Usuarios Participando: ", this.sortingUsers)}
    // else{
    // console.log("Usuario ya esta participando")
    // }
    // localStorage.setItem('sortingUsers', JSON.stringify(this.sortingUsers));

  }
  sort(){
    
    console.log(this.sortingUsers);
    const luckyIndex = Math.floor(Math.random() * this.sortingUsers.length);
    const luckyUser = this.sortingUsers[luckyIndex];
    console.log("Ganador:: ", luckyUser)
    alert(`¡${luckyUser.name} ganó la rifa!`);
    this.sortingUsers.splice(luckyIndex, 1);
    

  }

  printTicket(): void {
    const printContents = `
      <div class="ticket">
        <h2>🎟️ Rifa Ticket 🎟️</h2>
        <p><strong>Nombre:</strong> ${this.selectedUser.name}</p>
        <p><strong>Email:</strong> ${this.selectedUser.email}</p>
        
      </div>
      <img src="https://lirodev.madata.com/images/logo%20madata_chico%20negro.png" class="logo">
    `;
  
    const originalContents = document.body.innerHTML;
  
    // Replace the body content with the ticket and trigger print
    document.body.innerHTML = printContents;
    window.print();
  
    // Restore the original body content
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore Angular bindings
  }
  
  
}
