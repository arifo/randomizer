export type IconNames =
  | 'add'
  | 'delete'
  | 'edit'
  | 'chevronLeft'
  | 'close'
  | 'plusCircle'
  | 'settings'
  | 'share'
  | 'rate';

export const icons: { [K in IconNames]: number } = {
  add: require('./add.png'),
  delete: require('assets/images/delete.png'),
  edit: require('assets/images/edit.png'),
  chevronLeft: require('assets/images/chevron_left.png'),
  close: require('assets/images/close.png'),
  plusCircle: require('assets/images/circle-plus.png'),
  settings: require('assets/images/settings.png'),
  share: require('assets/images/share.png'),
  rate: require('assets/images/star_outline.png'),
};
