import { Component } from '@angular/core';
import { Story } from '../../models/story';
import { SettingStoryCard } from '../../components/setting-story-card-components/setting-story-card';
import { StoryStatus } from '../../models/story-status';

@Component({
  standalone: true,
  selector: 'app-setting',
  imports: [SettingStoryCard],
  templateUrl: './setting.html',
  styleUrl: './setting.scss',
})
export class Setting {
  stories: Story[] = [
    {
      stato: StoryStatus.PUBLISHED,
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
      stato: StoryStatus.PUBLISHED,
      category: 'categoria2',
      district: 'indirizzo2',
      date: '25-02-2026',
      title: 'TITOLO2',
      description:
        'Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenet  Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo,',
      storyContent:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae cumque veritatis cupiditate eligendi explicabo sed ad natus nemo, deleniti quia, exercitationem sint nobis nisi tenetur commodi a iusto impedit maiores.',
      username: 'user2',
    },
    {
      stato: StoryStatus.PUBLISHED,
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
      stato: StoryStatus.PUBLISHED,
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
