import { Component } from '@angular/core';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [SelectButton, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  stateOptions: any[] = [{ label: 'Breakfast', value: 'breakfast' }, { label: 'Salad', value: 'salad' }];

  value: string = 'off';
}
