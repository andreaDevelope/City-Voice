import { Component, output } from '@angular/core';
import { StoryType } from '../../models/story-type';

interface ChoiceCard {
  type: StoryType;
  number: string;
  title: string;
  subtitle: string;
  copy: string;
  action: string;
  iconPath: string;
}

@Component({
  selector: 'app-choice-cards',
  templateUrl: './choice-cards.html',
  styleUrl: './choice-cards.scss',
})
export class ChoiceCards {
  readonly choose = output<StoryType>();

  protected readonly cards: ChoiceCard[] = [
    {
      type: 'STORY',
      number: '01',
      title: 'Racconta una storia',
      subtitle: 'Hai vissuto qualcosa. Falla sentire.',
      copy: "Un'esperienza, un'ingiustizia, un gesto che ti ha fatto credere ancora nella città.",
      action: 'Inizia il racconto',
      iconPath: 'M20 4c-4-4-10 0-12 5l-3 9 9-3c5-2 10-7 6-11ZM3 21 16 8M7 14h6',
    },
    {
      type: 'REPORT',
      number: '02',
      title: 'Segnala un problema',
      subtitle: 'Lo vedi ogni giorno. Dillo qui.',
      copy: 'Un disservizio concreto, qualcosa che non funziona. Poche parole, fatti chiari.',
      action: 'Fai una segnalazione',
      iconPath: 'm4 10 14-6v16L4 14zM4 10H2v4h2m4 2 1 5h4l-2-6m10-7 2-2m-2 6h2',
    },
  ];
}
