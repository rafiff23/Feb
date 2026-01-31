export enum AppState {
  LOGIN_VIEW = 'LOGIN_VIEW',
  CARD_VIEW = 'CARD_VIEW',
  NOTE_VIEW = 'NOTE_VIEW',
  APPRECIATION_VIEW = 'APPRECIATION_VIEW',
  QUIZ_VIEW = 'QUIZ_VIEW',
  GALLERY_VIEW = 'GALLERY_VIEW',
  CLOSING_VIEW = 'CLOSING_VIEW',
}

export enum WishTone {
  HEARTFELT = 'Heartfelt',
  FUNNY = 'Funny',
  POETIC = 'Poetic',
  SHORT = 'Short & Sweet',
}

export interface WishRequest {
  name: string;
  relationship: string;
  tone: WishTone;
  hobbies?: string;
}