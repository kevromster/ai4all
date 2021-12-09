export class NotificationType {
  db_value: string;
  display_name: string;
}

// TODO: make one source for frontend, backend and detector
export const NOTIFICATION_TYPES: NotificationType[] = [
  { db_value: 'appearance', display_name: 'появление и пропажа'},
  { db_value: 'presence', display_name: 'наличие'},
  { db_value: 'absence', display_name: 'отсутствие'},
];
