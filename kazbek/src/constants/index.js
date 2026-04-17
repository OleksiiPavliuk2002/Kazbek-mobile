export const COLORS = {
  bg: '#0d0a07',
  bg2: '#140f09',
  bg3: '#1c150d',
  gold: '#c9933a',
  goldLt: '#e8b96a',
  red: '#8b2020',
  cream: '#9e6b0d',
  muted: '#a09070',
  border: 'rgba(201,147,58,0.25)',
};

export const IMAGES = {
  hero: { uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80' },
  about: { uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
  shashlik: { uri: 'https://images.unsplash.com/photo-1529066792305-5e4efa40fde9?w=900&q=80' },
  cuisine: { uri: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80' },
  footer: { uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=70' },
};

export const API_BASE = 'http://192.168.2.106:5000/api';

export const TIMES = [
  '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];
export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20];

export const CAFE_INFO = {
  name: 'Кафе Казбек',
  address: 'вул. Шевченка, 42, Дніпро',
  phone1: '+380675287632',
  phone1Label: '+38 (067) 528-76-32',
  phone2: '+380932864726',
  phone2Label: '+38 (093) 286-47-26',
  email: 'info@kazbek.cafe',
  hours: [
    { day: 'Пн – Пт', time: '11:00 – 23:00' },
    { day: 'Субота', time: '11:00 – 00:00' },
    { day: 'Неділя', time: '12:00 – 23:00' },
  ],
  mapLat: 48.43089409470405,
  mapLon: 34.79564665870066,
};

export const CUISINE_CARDS = [
  { icon: '🍖', title: 'М\'ясо та мангал', text: 'Традиція смаження м\'яса на відкритому вогні походить від стародавніх пастухів Кавказу. Шашлик, люля-кебаб - це ритуал.' },
  { icon: '🥟', title: 'Хінкалі та хачапурі', text: 'Символи грузинської кухні. Хінкалі - соковиті пельмені з бульйоном, хачапурі - коржик з тягучим сиром.' },
  { icon: '🌶', title: 'Спеції та трави', text: 'Хмелі-сунелі, кінза, тархун - аромати, які неможливо забути. Кожен регіон має свій букет трав.' },
  { icon: '🍷', title: 'Вино і тости', text: 'Грузія - колиска виноробства. Традиція тамади та урочистих тостів - частина кавказького застілля.' },
  { icon: '🧀', title: 'Молочні продукти', text: 'Сулугуні, мацони, бринза — ніжні сири та кисломолочні продукти гірських пасовищ.' },
  { icon: '🍬', title: 'Солодощі', text: 'Пахлава, чурчхела, козинаки - східні солодощі, наповнені горіхами та медом.' },
];

export const MENU_FALLBACK = [
  { id: 1, name: 'Шашлик з баранини', type: 'Гаряче', portion: '300 г', price: 380, emoji: '🍖' },
  { id: 2, name: 'Шашлик з яловичини', type: 'Гаряче', portion: '300 г', price: 340, emoji: '🥩' },
  { id: 3, name: 'Шашлик з курки', type: 'Гаряче', portion: '300 г', price: 260, emoji: '🍗' },
  { id: 4, name: 'Люля-кебаб', type: 'Гаряче', portion: '250 г', price: 290, emoji: '🌯' },
  { id: 5, name: 'Хінкалі (5 шт.)', type: 'Гаряче', portion: '350 г', price: 210, emoji: '🥟' },
  { id: 6, name: 'Долма', type: 'Гаряче', portion: '200 г', price: 195, emoji: '🫑' },
  { id: 7, name: 'Чанахі', type: 'Гаряче', portion: '350 г', price: 265, emoji: '🍲' },
  { id: 8, name: 'Пити', type: 'Суп', portion: '400 мл', price: 185, emoji: '🍵' },
  { id: 9, name: 'Харчо', type: 'Суп', portion: '400 мл', price: 175, emoji: '🍜' },
  { id: 10, name: 'Аджапсандалі', type: 'Закуска', portion: '200 г', price: 155, emoji: '🥗' },
  { id: 11, name: 'Мацоні із зеленню', type: 'Закуска', portion: '200 г', price: 120, emoji: '🥛' },
  { id: 12, name: 'Сир Сулугуні', type: 'Закуска', portion: '150 г', price: 140, emoji: '🧀' },
  { id: 13, name: 'Пхали', type: 'Закуска', portion: '180 г', price: 135, emoji: '🥬' },
  { id: 14, name: 'Лаваш', type: 'Хліб', portion: '1 шт.', price: 45, emoji: '🫓' },
  { id: 15, name: 'Лобіані', type: 'Хліб', portion: '1 шт.', price: 95, emoji: '🫓' },
  { id: 16, name: 'Хачапурі по-аджарськи', type: 'Хліб', portion: '1 шт.', price: 185, emoji: '🥐' },
  { id: 17, name: 'Чурчхела', type: 'Десерт', portion: '1 шт.', price: 85, emoji: '🍬' },
  { id: 18, name: 'Пахлава', type: 'Десерт', portion: '150 г', price: 110, emoji: '🍯' },
];