import { Component, ModelFunction, OnInit, model } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api'
import { Menubar } from 'primeng/menubar'
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService } from '../services/photoService';
import { IGalleria } from '../interfaces/IGalleria';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-home',
  imports: [
    MenubarModule, Menubar, ButtonModule, GalleriaModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  items: MenuItem[] | undefined;
  images: IGalleria[] | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4
    },
    {
      breakpoint: '575px',
      numVisible: 1
    }
  ];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home']
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
        routerLink: ['/reservations']
      }
    ]

    this.images = [
      {
        itemImageSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/56/71/59/atmosphere.jpg',
        thumbnailImageSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/56/71/59/atmosphere.jpg',
        alt: 'Restaurant lobby 1',
        title: 'Restaurant lobby 1'
      },
      {
        itemImageSrc: 'https://fasano.com.br/wp-content/uploads/2023/10/Gero_HFRJ_credBruno-Fioravanti-1.jpg',
        thumbnailImageSrc: 'https://fasano.com.br/wp-content/uploads/2023/10/Gero_HFRJ_credBruno-Fioravanti-1.jpg',
        alt: 'Restaurant lobby 2',
        title: 'Restaurant lobby 2'
      },
      {
        itemImageSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/a8/28/85/bar-canton.jpg?w=600&h=400&s=1',
        thumbnailImageSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/a8/28/85/bar-canton.jpg?w=600&h=400&s=1',
        alt: 'Restaurant lobby 3',
        title: 'Restaurant lobby 3'
      },
      {
        itemImageSrc: 'https://fasano.com.br/wp-content/uploads/2023/10/GERO_Tomas-Rangel_2020-5.jpg',
        thumbnailImageSrc: 'https://fasano.com.br/wp-content/uploads/2023/10/GERO_Tomas-Rangel_2020-5.jpg',
        alt: 'Restaurant lobby 4',
        title: 'Restaurant lobby 4'
      },
      {
        itemImageSrc: 'https://qul.imgix.net/b5dad46d-690e-4369-9ada-9cf86e6078c6/641947_sld.jpg',
        thumbnailImageSrc: 'https://qul.imgix.net/b5dad46d-690e-4369-9ada-9cf86e6078c6/641947_sld.jpg',
        alt: 'Restaurant lobby 5',
        title: 'Restaurant lobby '
      }
    ]
  }

}

