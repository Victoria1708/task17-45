import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardModule} from 'primeng/card';

export interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public productsCars: Product[] = [];
  public users: any[] = [];
  public title = 'be-ua';
  public users$: Observable<any>;
  public products: Product[] = [
    {code: 'CA001', name: 'Tesla', category: 'cars', quantity: 1},
    {code: 'PH01', name: 'Samsung A3', category: 'phones', quantity: 5},
    {code: 'PH02', name: 'Samsung A4', category: 'phones', quantity: 10},
    {code: 'PH03', name: 'Samsung A5', category: 'phones', quantity: 8},
    {code: 'CA002', name: 'Mercedes', category: 'cars', quantity: 10},
    {code: 'T0002', name: 'Tesla', category: 'cars', quantity: 5},
    {code: 'VO002', name: 'Volvo', category: 'cars', quantity: 4},
    {code: 'FRD01', name: 'Ford', category: 'others', quantity: 8},
    {code: 'PR04', name: 'E-book', category: 'others', quantity: 8},
    {code: 'A0005', name: 'Audi', category: 'cars', quantity: 13},
    {code: 'H0001', name: 'Honda', category: 'cars', quantity: 8},
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.productsCars = this.products.filter(item => item.category === 'cars').sort((a, b) => a.quantity - b.quantity);
    this.users$ = this.getClient();

    this.users$.subscribe((users) => {
      this.users = users.sort((a, b) => a.id - b.id);
    });
  }

  getClient(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  addProduct(product): void {
    this.productsCars.push(product);
  }

  ngAfterViewInit(): void {
    console.log(this.productsCars);
    this.users$.subscribe((u) => {
      console.log(this.users);
    });
  }

}

// TODO:
// + 1. Описать интерфейс для products
// + 2. Вывести в таблицу только продукты, у которых category равен cars:
// (с помощью подходящего хук-метода нужно на основе исходного массива products создать новый массив с учетом заданого условия, а также сделать соответсвующий биндинг в шаблоне)
// + 3. Для ячейки таблицы, в которой название продукта равно Volvo задать класс sale
// + 4. Отсортировать таблицу по возрастанию значения колонки Quantity
// 5. Таблица Users
// + 5.1 Ознакомится с https://jsonplaceholder.typicode.com/
// + 5.2 Сделать фетч запрос для получения списка users
// + 5.3 Отрисовать таблицу Users* по аналогии с таблицей Products
// используется компонент библиотеки PrimeNg, ссылка на доки:
// https://www.primefaces.org/primeng/v9-lts/#/table
// NOTE:* в таблице Users должно быть пять колонок: имя пользователя, имейл, город проживания, телефон, вебсайт.
// + 6. Создать дочерний компонент,
// + 6.1 в дочерний компонент передать первый обьект из массива products
// + 6.2 отрисовать его с помошью компонента Card библиотеки PrimeNg, доки:
// https://www.primefaces.org/primeng/v9-lts/#/card
// + NOTE: Вывести информацию по всем свойствам обьекта (дизайн на свой вкус)
// + 6.3 в футере карточки добавить кнопку с надписью "Дублировать"
// + 6.4 по нажатию на кнопку в родительском компоненте
// в таблицу должна добавится еще одна строка со следующими характеристиками продукта:
// {code: 'CA001*', name: 'Tesla*', category: 'cars', quantity: 0},
// 7. добавить хук-метод ngAfterViewInit(), в котором в консоль вывести оба массива - с продуктами, у которых category равен cars и пользователями
