import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.html',
  styleUrls: ['./nav-mobile.scss'],
  imports: [RouterLink],
})
export class NavMobile {}
