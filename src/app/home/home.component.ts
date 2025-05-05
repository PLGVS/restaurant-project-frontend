import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MenubarModule, ButtonModule, GalleriaModule, RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  ngOnInit() {

  }

}

