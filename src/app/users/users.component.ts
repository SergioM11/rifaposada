import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Include Notyf styles
import { MatDialog } from '@angular/material/dialog';

// import { WinnerModalComponent } from './winner-modal/winner-modal.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;
  private notyf = new Notyf();
  totalPlaybackTime = 0; // Tracks total playback duration
  maxPlaybackTime = 5000; // 5 seconds in milliseconds
  showSort = false;
  hideSort = true;
  users: any[] = [];
  prizeList: any[] = [];
  prize: any[] = [];
  sortingUsers: any[] = [];
  winners: any[] = [];
  wonPrizes: any[] = [];
  filteredUsers: any[] = [];
  emailFilter: string = '';
  selectedEmail: string = '';
  selectedName: string = '';
  selectedUser: any = null;
  winner: any = null;
  swal: any;
  num: number = 0;
  winnerName = '';
  winnerEmail = '';
  prizeNum = '';
  prizeName = '';
  isButtonDisabled = false;
  showWinnerAlert = false;
  showPrizeAlert = false;
  hidePrize = true;
  prizeRevealed = false;
  winnersList: { Name: string; Email: string; Prize: string; Num: number }[] = [];
  prizeImage: string = '';
  isNonClickable = true;


  constructor() {}

  addGrandWinner(winner: { Name: string; Email: string; Prize: string; Num: number }): void {
    this.winnersList.push(winner);
    localStorage.setItem('winnersList', JSON.stringify(this.winnersList));
    console.log('Updated Winners List:', this.winnersList);
  }


  revealPrize() {
    this.prizeRevealed = true;
  }
  // constructor(private dialog: MatDialog) {}

  openDialog() {
    console.log("Funciono");
  }

  
  showSuccess() {
    console.log("Show Success clicked");
    // Swal.fire({
    //   title: 'Success!',
    //   text: 'This is a success alert.',
    //   icon: 'success',
    //   confirmButtonText: 'Cool'
    // });
    
  }

  ngOnInit(): void {
    const savedUsers = localStorage.getItem('users');
    this.sortingUsers = JSON.parse(localStorage.getItem('sortingUsers') || '[]');
    this.prizeList = JSON.parse(localStorage.getItem('prizes') || '[]');
    this.winners = JSON.parse(localStorage.getItem('winners') || '[]');
    this.winnersList = JSON.parse(localStorage.getItem('winnersList') || '[]');
    
  
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
      this.filteredUsers = [...this.users];
      console.log('Loaded Users from LocalStorage:', this.users);
    } else {
      console.log('No users found in LocalStorage');
      this.filteredUsers = [];
    }


   
  };
  pauseVideo() {
    const videoElement = this.videoRef.nativeElement;

    if (videoElement) {
      videoElement.pause(); // Pause the video
      console.log('Video paused after 5 seconds');
    }
  }
  // ngAfterViewInit() {
  //   const videoElement = this.videoRef.nativeElement;

  //   videoElement.addEventListener('timeupdate', () => {
  //     this.totalPlaybackTime += 100; // Estimate 100ms per tick
  //     if (this.totalPlaybackTime >= this.maxPlaybackTime) {
  //       videoElement.pause(); // Stop after reaching 5 seconds
  //       console.log('Video playback completed 5 seconds');
  //     }
  //   });

  //   videoElement.addEventListener('ended', () => {
  //     if (this.totalPlaybackTime < this.maxPlaybackTime) {
  //       videoElement.currentTime = 0; // Restart the video
  //       videoElement.play();
  //     }
  //   });
  // }

  announceWinner() {
    const luckyUser = this.winner;

    // Set winner details
    this.winnerName = `${luckyUser.name}`;
    this.winnerEmail = luckyUser.email;

    // Show the alert
    this.showWinnerAlert = true;

    // Hide the alert after 5 seconds
    // setTimeout(() => {
    //   this.showWinnerAlert = false;
    // }, 12000);
  }
  hideWinnerAlert() {
    this.showWinnerAlert = false;
  }

  enableClick(){
    setTimeout(() => {
      this.isNonClickable = false;
    }, 5000);
  }
  disableClick(){
    this.isNonClickable = true;
  }
  sortPrize(){
    this.prizeRevealed = false;
   
    this.showPrizeAlert = true;



  
    console.log(this.prizeList);
    const prizeIndex = Math.floor(Math.random() * this.prizeList.length);
    const prize = this.prizeList[prizeIndex];
    console.log("Ganó:: ", prize)
    const newWinner = {
      Name: this.winnerName,
      Email: this.winnerEmail,
      Prize: prize.prizeName,
      Num: prize.prizeNum
    };
    this.prizeNum = prize.prizeNum;
    this.prizeName = prize.prizeName;
    this.prizeImage = encodeURIComponent(prize.prizeName) + '.png';
    setTimeout(() => {
      this.prizeRevealed = true; // Trigger the animation and content switch
    }, 2500); 


    console.log("Imagen::", this.prizeImage)

    this.addGrandWinner(newWinner);
    // this.winner+prize;
    

    setTimeout(() => {
      // Optionally reset back to the closed state after 2 seconds

      this.notyf.success(`¡Te ganaste: ${prize.prizeName}!`);
      
      
    }, 3000); // Revert the gift back after 2 seconds

    
    this.prizeList.splice(prizeIndex, 1);
    localStorage.setItem('prizes', JSON.stringify(this.prizeList));
    
    // this.showPrizeAlert = false;
    // this.showWinnerAlert = false;
     // Revert the gift back after 2 seconds
  }
  hidePrizeAlert() {
    this.showPrizeAlert = false;
    this.isNonClickable = true;
  }
  
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
  
  
  
    
  
  


  
    
  

  toggleForm() {
    this.showSort = !this.showSort; // Toggles the visibility of the form
    this.hideSort = !this.hideSort; // Toggles the visibility of the form
    setTimeout(() => {
      // Optionally reset back to the closed state after 2 seconds
      this.showSort = !this.showSort; // Toggles the visibility of the form
      this.hideSort = !this.hideSort;
      // this.pauseVideo();
    }, 5000);
    
    // this.showSort = !this.showSort; // Toggles the visibility of the form
  }
  giftState: string = 'closed';
  openGift() {
    this.giftState = 'opened';
    setTimeout(() => {
      // Optionally reset back to the closed state after 2 seconds
      this.giftState = 'closed';
    }, 2000); // Revert the gift back after 2 seconds
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
    this.isButtonDisabled = true;
    console.log(this.sortingUsers);
    const luckyIndex = Math.floor(Math.random() * this.sortingUsers.length);
    const luckyUser = this.sortingUsers[luckyIndex];
    console.log("Ganador:: ", luckyUser)
    this.winners.push(luckyUser);
    this.winner= luckyUser;
    localStorage.setItem('winners', JSON.stringify(this.winners));
    setTimeout(() => {
      // Optionally reset back to the closed state after 2 seconds

      this.notyf.success(`¡${luckyUser.name} ganó la rifa!`);
      this.isButtonDisabled = false;
      this.announceWinner()
    }, 3000); // Revert the gift back after 2 seconds
    
    this.sortingUsers.splice(luckyIndex, 1);
    localStorage.setItem('sortingUsers', JSON.stringify(this.sortingUsers));

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
