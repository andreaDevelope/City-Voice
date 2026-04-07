import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-header-app',
  templateUrl: './header.app.html',
  styleUrls: ['./header.app.scss'],
  imports: [RouterLink],
})
export class HeaderApp {}
