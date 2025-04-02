import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ApiService } from '../services/api.service';
import { ButtonModule } from 'primeng/button';
import { format } from 'date-fns'
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-reservation',
  imports: [InputTextModule, FormsModule, FloatLabelModule,
    SelectModule, DatePicker, ButtonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  value: String | undefined
  peopleNumber: number[] | undefined
  datetime24h: Date[] | undefined

  reservations: any[] = [];
  reservationData: {
    name: string,
    peopleQtt: number | null,
    reservationDate: Date
  } = {
      name: '',
      peopleQtt: null,
      reservationDate: new Date()
    };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.peopleNumber = [1, 2, 3, 4]
  }

  submitReservation() {
    if (!this.reservationData.name || !this.reservationData.reservationDate) {
      console.log("Por favor, preencha todos os campos.")
      return;
    }

    const parsedDate = this.reservationData.reservationDate
      ? new Date(this.reservationData.reservationDate)
      : null;

    const formattedDate = parsedDate
      ? format(parsedDate, 'dd/MM/yyyy HH:mm')
      : '';

    const payload = {
      name: this.reservationData.name,
      peopleQtt: this.reservationData.peopleQtt,
      reservationDate: formattedDate
    }

    this.apiService.bookTable(payload).subscribe(
      (newReservation) => {
        this.reservations.unshift(newReservation);
        this.reservationData = { name: '', peopleQtt: null, reservationDate: new Date() }
      },
      (error) => {
        console.error('Erro ao enviar reserva: ', error);
      }
    );

    console.log("Função executada!")
  }
}
