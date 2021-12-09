export class DetectionItem {
  db_value: string;
  display_name: string;
}

// TODO: make one source for frontend, backend and detector
export const DETECTION_ITEMS: DetectionItem[] = [
  { db_value: 'person', display_name: 'человека'},
  { db_value: 'bicycle', display_name: 'велосипеда'},
  { db_value: 'car', display_name: 'автомобиля'},
  { db_value: 'airplane', display_name: 'самолета'},
  { db_value: 'bus', display_name: 'автобуса'},
  { db_value: 'train', display_name: 'поезда'},
  { db_value: 'truck', display_name: 'грузовика'},
  { db_value: 'boat', display_name: 'лодки'},
  { db_value: 'bird', display_name: 'птицы'},
  { db_value: 'cat', display_name: 'кошки'},
  { db_value: 'dog', display_name: 'собаки'},
  { db_value: 'horse', display_name: 'лошади'},
  { db_value: 'umbrella', display_name: 'зонтика'},
  { db_value: 'bottle', display_name: 'бутылки'},
  { db_value: 'wine glass', display_name: 'бокала вина'},
  { db_value: 'cup', display_name: 'чашки'},
  { db_value: 'pizza', display_name: 'пиццы'},
];
