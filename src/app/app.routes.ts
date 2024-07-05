import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { LogsComponent } from './pages/logs/logs.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'

    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'messages',
        component: MessagesComponent
    },
    {
        path: 'logs',
        component: LogsComponent
    }
];
