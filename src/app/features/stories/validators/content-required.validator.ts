import { ValidatorFn } from '@angular/forms';

export const NOT_BLANK = /\S/;

export const contentRequired: ValidatorFn = (group) => {
  const description = group.get('description')?.value ?? '';
  const storyContent = group.get('storyContent')?.value ?? '';
  return NOT_BLANK.test(description) || NOT_BLANK.test(storyContent)
    ? null
    : { contentRequired: true };
};
