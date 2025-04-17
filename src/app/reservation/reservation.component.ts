import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ApiService } from '../services/api.service';
import { ButtonModule } from 'primeng/button';
import { format, parse } from 'date-fns'
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { HttpParams } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-reservation',
  imports: [InputTextModule, FormsModule, FloatLabelModule,
    SelectModule, DatePicker, ButtonModule, InputGroupModule, InputGroupAddonModule,
    ToastModule, MessageModule, CommonModule, DropdownModule, CalendarModule, SelectButtonModule
  ],
  providers: [MessageService],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnInit {
  value: String | undefined;
  peopleNumber: number[] | undefined;
  datetime24h: Date[] | undefined;

  selectedTable: number | null = null;
  selectedTime: string | null = null;

  tables = [
    { label: 'Table 1', value: 1 },
    { label: 'Table 2', value: 2 },
    { label: 'Table 3', value: 3 },
    { label: 'Table 4', value: 4 },
    { label: 'Table 5', value: 5 },
    { label: 'Table 6', value: 6 },
    { label: 'Table 7', value: 7 },
    { label: 'Table 8', value: 8 },
    { label: 'Table 9', value: 9 },
    { label: 'Table 10', value: 10 },
  ]

  times = [
    { label: '17:00', value: '17:00' },
    { label: '20:00', value: '20:00' },
    { label: '23:00', value: '23:00' },
  ]

  timeSlots: { label: string, value: string; disabled?: boolean }[] = [];

  displaySending = 'none';
  displaySucess = 'none';
  displayError = 'none';

  reservations: any[] = [];
  reservationData: {
    customerName: string,
    customerEmail: string,
    tableNumber: number | null,
    personsNumber: number | null,
    reservationDate: Date,
    reservationTime: string | null
  } = {
      customerName: '',
      customerEmail: '',
      personsNumber: null,
      tableNumber: null,
      reservationDate: new Date(),
      reservationTime: null
    };

  constructor(private apiService: ApiService,
    private messageService: MessageService) { }


  ngOnInit() {
    this.peopleNumber = [1, 2, 3, 4];
    this.timeSlots = [...this.times]
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' })
  }

  onTableOrDateChange() {
    if (this.selectedTable && this.reservationData.reservationDate) {
      const parsedDate = new Date(this.reservationData.reservationDate);

      const today = new Date();

      parsedDate?.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (parsedDate < today) {
        console.warn("The Date is before the actual date!")
        this.timeSlots = this.times.map(slot => ({
          ...slot,
          disabled: true
        }))
      }

      const formattedDate = parsedDate
        ? format(parsedDate, 'dd/MM/yyyy')
        : '';


      const params = new HttpParams()
        .set('tableNumber', this.selectedTable)
        .set('reservationDate', formattedDate)



      this.apiService.getUnavailableTimes(params).subscribe((unavailable: string[]) => {
        this.timeSlots = this.times.map(slot => ({
          ...slot,
          disabled: unavailable.includes(slot.value)
        }))
      }
      ),
        console.log(this.timeSlots)

    }
  }

  submitReservation() {
    this.displaySending = 'block';
    if (!this.reservationData.customerName || !this.reservationData.reservationDate) {
      console.log("Por favor, preencha todos os campos.")
      return;
    }

    this.reservationData.reservationTime = this.selectedTime
    this.reservationData.tableNumber = this.selectedTable

    const parsedDate = this.reservationData.reservationDate
      ? new Date(this.reservationData.reservationDate)
      : null;

    const formattedDate = parsedDate
      ? format(parsedDate, 'dd/MM/yyyy')
      : '';

    const payload = {
      customerName: this.reservationData.customerName,
      customerEmail: this.reservationData.customerEmail,
      tableNumber: this.reservationData.tableNumber,
      personsNumber: this.reservationData.personsNumber,
      reservationDate: formattedDate,
      reservationTime: this.reservationData.reservationTime
    }

    console.log(payload)

    this.apiService.bookTable(payload).subscribe(
      (newReservation) => {
        this.reservations.unshift(newReservation);
        this.displaySending = 'none';
        this.displaySucess = 'block';
        setTimeout(() => {
          this.displaySucess = 'none'
        }, 5000)
        this.reservationData = { customerName: '', customerEmail: '', tableNumber: null, personsNumber: null, reservationDate: new Date(), reservationTime: null }
      },
      (error) => {
        this.displaySending = 'none';
        this.displayError = 'block';
        console.error('Erro ao enviar reserva: ', error);

        setTimeout(() => {
          this.displayError = 'none'
        }, 5000)
      }
    );

    console.log("Função executada!")
  }
}
