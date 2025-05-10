import { Component, OnInit } from '@angular/core';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  imports: [FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(private menuService: MenuService) { }

  stateOptions: any[] = [{ label: 'Breakfast', value: 'breakfast' }, { label: 'Salad', value: 'salad' }];

  value: string = 'off';

  displayBreakfast = 'grid';
  displaySalad = 'none';
  displaySoup = 'none';
  displayMainDishes = 'none';
  displayDessert = 'none';
  displayColdDrinks = 'none';

  myItems: { name: String, imageUrl: String, ingredients: String[], price: String }[] = [

  ]



  visibility() {
    let option = (<HTMLInputElement>document.getElementById("id-menu-options")).value

    switch (option) {
      case 'Salad':
        this.displaySalad = 'grid';
        this.displayBreakfast = 'none';
        this.displaySoup = 'none';
        this.displayMainDishes = 'none';
        this.displayDessert = 'none';
        this.displayColdDrinks = 'none';
        break;
      case 'Breakfast':
        this.displayBreakfast = 'grid';
        this.displaySalad = 'none';
        this.displaySoup = 'none';
        this.displayMainDishes = 'none';
        this.displayDessert = 'none';
        this.displayColdDrinks = 'none';
        break;
      case 'Soup':
        this.displaySoup = 'grid';
        this.displaySalad = 'none';
        this.displayBreakfast = 'none'
        this.displayMainDishes = 'none';
        this.displayDessert = 'none';
        this.displayColdDrinks = 'none';
        break;
      case 'MainDishes':
        this.displayMainDishes = 'grid';
        this.displaySalad = 'none';
        this.displayBreakfast = 'none';
        this.displaySoup = 'none';
        this.displayDessert = 'none';
        this.displayColdDrinks = 'none';
        break;
      case 'Dessert':
        this.displayDessert = 'grid';
        this.displaySalad = 'none';
        this.displayBreakfast = 'none';
        this.displaySoup = 'none';
        this.displayMainDishes = 'none';
        this.displayColdDrinks = 'none';
        break;
      case 'ColdDrinks':
        this.displayColdDrinks = 'grid';
        this.displaySalad = 'none';
        this.displayBreakfast = 'none';
        this.displaySoup = 'none';
        this.displayMainDishes = 'none';
        this.displayDessert = 'none';
        break;
    }

    this.myItems = []

    this.menuService.getDishes(option).subscribe({
      next: (value) => {
        for (let i = 0; i < value.length; i++) {
          let test = value[i]
          const obj = JSON.parse(test)
          let price: number = obj.price
          let parsedPrice: string = price.toFixed(2)
          this.myItems.push({ name: obj.name, imageUrl: obj.imageUrl, ingredients: obj.ingredients, price: parsedPrice })
        }
      }
    })

    this.myItems.push();
  }

}
