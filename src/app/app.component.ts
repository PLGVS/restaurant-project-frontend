import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config'
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { bootstrapApplication } from '@angular/platform-browser';
import { ReservationComponent } from "./reservation/reservation.component";
import { MenuItem } from 'primeng/api'
import { Menubar } from 'primeng/menubar'
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  constructor(private primeng: PrimeNG) { }

  items: MenuItem[] | undefined

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
      },
      {
        label: 'Menu',
        items: [
          {
            label: 'Food'
          },
          {
            label: 'Drinks'
          },
          {
            label: 'Cocktails'
          }
        ]
      },
      {
        label: 'Reservations',
        routerLink: '/reservation'
      }
    ]

    this.primeng.ripple.set(true);
  }
}
