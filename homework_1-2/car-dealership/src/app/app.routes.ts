import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'not-found', component: NotFoundComponent, title: 'Not Found' },
  { path: '**', redirectTo: 'not-found' },
];
