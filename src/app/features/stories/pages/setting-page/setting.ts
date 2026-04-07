import { Component } from '@angular/core';
import { Story } from '../../models/story';
import { SettingStoryCard } from '../../components/setting-story-card-components/setting-story-card';
import { StoryStatus } from '../../models/story-status';
import { DesktopButtonDrawer } from "../../../../shared/ui/desktop-buttons/desktop-button-drawer";

@Component({
  standalone: true,
  selector: 'app-setting',
  imports: [SettingStoryCard, DesktopButtonDrawer],
  templateUrl: './setting.html',
  styleUrl: './setting.scss',
})
export class Setting {
  label: string = 'RACCONTA LA TUA STORIA';
  microBottom: string = 'NO INFO PERSONALI'
  microTop: string = 'ANONIMO GARANTITO'
  stories: Story[] = [
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria1',
      district: 'indirizzo1',
      date: '25-02-2026',
      title: 'TITOLO1',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user1',
    },
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria2',
      district: 'indirizzo2',
      date: '25-02-2026',
      title: 'TITOLO2ghjeytvbj6u7jvb6rukjb6utvbuunvbrtynh6rtynr5ny',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user2',
    },
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria3',
      district: 'indirizzo3',
      date: '25-02-2026',
      title: 'TITOLO3',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user3',
    },
    {
      state: StoryStatus.PUBLISHED,
      category: 'categoria4',
      district: 'indirizzo',
      date: '25-02-2026',
      title: 'TITOLO4',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user4',
    },
  ];
}
