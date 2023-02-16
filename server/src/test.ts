// require('@babel/register')({ extensions: ['.js', '.ts'] });
// import { startUp } from './server.ts';

// startUp();

import dayjs from 'dayjs';

console.log('weekday: ', dayjs().day()); //weekday starting from 0 -> sunday
console.log('weekday: ', dayjs().format('d')); //weekday starting from 0 -> sunday
console.log('datejs+10h: ', dayjs().clone().add(10, 'hours').toDate());
console.log('last day: ', dayjs().endOf('month').format('DD')); //last day of month
console.log('day number :', dayjs().date()); //month's day number
console.log('month number :', dayjs().month()); //month number starting from 0 -> january
console.log(dayjs().toDate()); // 2023-02-16T10:58:09.756Z
// console.log(dayjs(new Date().getTime()));
// outpout => d {
//     '$L': 'en',
//     '$d': 2023-02-16T12:45:05.973Z,
//     '$x': {},
//     '$y': 2023,
//     '$M': 1,
//     '$D': 16,
//     '$W': 4,
//     '$H': 13,
//     '$m': 45,
//     '$s': 5,
//     '$ms': 973
//   }
console.log(
  dayjs().toDate().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
);
// const frenchDate = dayjs().toDate().toLocaleDateString('fr-FR', {
//   day: '2-digit',
//   month: '2-digit',
//   year: 'numeric',
// });
// console.log(
//   new Date(
//     Date.parse(
//       frenchDate.slice(6) +
//         '-' +
//         frenchDate.slice(3, 5) +
//         '-' +
//         frenchDate.slice(0, 2)
//     )
//   )
// );

// console.log(new Date().getTime());
// console.log(Date.now());
// console.log(new Date(new Date().getTime())); // 2023-02-16T10:58:09.756Z
// export {};

// const objet = [
//   { email: 'test', salt: 'V11da', id: 1 },
//   { email: 'test', salt: 'dzdz', id: 2 },
// ];

// console.log(objet.map((x) => x.id));
// console.log(Object.values(objet).map((x) => x.id));
