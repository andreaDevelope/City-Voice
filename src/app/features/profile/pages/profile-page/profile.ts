import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  attivitaMissions: {
    badje: { badjeImg: string; badjeName: string; badjeDescription: string };
    missione: { active: boolean; progress: number };
  }[] = [
    {
      badje: {
        badjeImg: '',
        badjeName: 'badje1',
        badjeDescription: 'hai inviato le tue prime 3 segnalazioni',
      },
      missione: {
        active: true,
        progress: 2,
      },
    },
  ];
}
