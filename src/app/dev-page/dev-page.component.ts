import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { MenuService } from '../services/menu.service';
import { LoginService } from '../services/login.service';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-dev-page',
  imports: [DrawerModule, ButtonModule, AvatarModule, TableModule,
    CommonModule, FormsModule, TabsModule, DialogModule, InputNumberModule,
    ChipModule, InputGroupAddonModule, InputGroupModule, ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './dev-page.component.html',
  standalone: true,
  styleUrl: './dev-page.component.scss'
})
export class DevPageComponent implements OnInit {
  constructor(private router: Router, private menuService: MenuService, private loginService: LoginService,
    private confirmationService: ConfirmationService, private messageService: MessageService
  ) { }

  userName: string = localStorage.getItem("userName") || ""

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
    this.drawerRef.close(e)
  }

  visible: boolean = false;



  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/dev/login'])
    }

    let token: String = localStorage.getItem("token") || ""
    let userName: String = localStorage.getItem("userName") || ""

    this.loginService.validateToken(token).subscribe({
      next(value) {
        if (value.userName != userName) {
          localStorage.removeItem("token")
          localStorage.removeItem("userName")
          window.location.reload()
        }
      },
    })

    this.menuService.getCategories().subscribe({
      next: (value) => {
        for (let i = 0; i < value.length; i++) {
          let category = value[i]
          const obj = JSON.parse(category)
          let dishesTest: { name: string, imageUrl: string, ingredients: string[], price: string }[] = []
          for (let j = 0; j < obj.dishes.length; j++) {
            const teste = JSON.stringify(obj.dishes[j])
            const teste2 = JSON.parse(teste)
            dishesTest.push({ name: teste2.name, imageUrl: teste2.imageUrl, ingredients: teste2.ingredients, price: teste2.price })
          }
          this.categories.push({ categoryName: obj.categoryName, dishes: dishesTest })

        }
      }
    })
  }

  categories: { categoryName: string, dishes: { name: string, imageUrl: string, ingredients: string[], price: string }[] }[] = []

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    window.location.reload()
  }

  changeTab(id: any) {
    const oldTabs = document.getElementsByClassName("content-show")
    if (oldTabs.length > 0) {
      const oldTab = oldTabs[0]
      oldTab.className = "content"
    }

    const tab = document.getElementById(id)
    tab?.classList.add("content-show");
  }

  visibleDialog: boolean = false;

  showDialog() {
    this.ingredients.splice(0, this.ingredients.length)
    this.visibleDialog = true;
  }

  dishData: {
    name: string,
    imageUrl: string,
    ingredients: string[],
    price: number | null
  } = {
      name: '',
      imageUrl: '',
      ingredients: [],
      price: null
    }

  selectedIngredient: string = "";
  ingredients: string[] = [];

  addIngredient(ingredient: string) {
    this.ingredients.push(ingredient)
  }

  submitDish(category: string) {
    const payload = {
      name: this.dishData.name,
      imageUrl: this.dishData.imageUrl,
      ingredients: this.ingredients,
      price: this.dishData.price
    }

    this.menuService.addDish(category, payload).subscribe(
      (newDish) => {
        this.dishData = { name: '', imageUrl: '', ingredients: [], price: null }
        console.log("Success")
      },
      (error) => {
        console.error("Error: " + error)
      }
    )
  }

  deleteDish(category: string, dishName: string) {
    console.log("Executando")
    console.log(category)
    console.log(dishName)
    this.menuService.deleteDish(category, dishName).subscribe(
      (error) => {
        console.error("Error: " + error)
      }
    )
  }

  confirm(event: Event, categoryName: string, dishName: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this dish?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Dish deleted' });
        this.deleteDish(categoryName, dishName);
      },
    });
  }
}
