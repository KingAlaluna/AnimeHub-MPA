// general template btn filter
class Filter1 {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}


// genres filter
export const filterGenres = [
  new Filter1('Екшен', 1),
  new Filter1('Пригоди', 2),
  new Filter1('Комедія', 4),
  new Filter1('Драма', 8),
  new Filter1('Фентезі', 10),
  new Filter1('Жахи', 14),
  new Filter1('Містика', 7),
  new Filter1('Романтика', 22),
  new Filter1('Наукова фантастика', 24),
  new Filter1('Повсякденність', 36),
  new Filter1('Спорт', 30),
  new Filter1('Надприродне', 37),
  new Filter1('Трилер', 41),
  new Filter1('Сьонен', 27),
  new Filter1('Сьоджьо', 25),
  new Filter1('Сейнен', 42),
  new Filter1('Джьосей', 43),
  new Filter1('Для дітей', 15),
  new Filter1('Історичні', 13),
  new Filter1('Бойові мистецтва', 17),
  new Filter1('Меха', 18),
  new Filter1('Музика', 19),
  new Filter1('Школа', 23),
  new Filter1('Суперсили', 31),
  new Filter1('Військові', 38),
  new Filter1('Поліція', 39),
  new Filter1('Психологічні', 40),
  new Filter1('Еччі', 9),
  new Filter1('Еротика', 49),
  new Filter1('Хентай', 12)
];


// types filter
export const filtersTypes = [
  new Filter1('Телесеріали', 'tv'),
  new Filter1('Фільми', 'movie'),
  new Filter1('OVA', 'ova'),
  new Filter1('Спешели', 'special'),
  new Filter1('ONA', 'ona'),
  new Filter1('Музичні відео', 'music')
];


// years filter
export const filtersYears = [];


let year = 2026;

while (year > 1990) {
  filtersYears.push(new Filter1(`${year}`, year));
  year -= 1;
}


// studios filter
export const filtersStudios = [
  new Filter1('Bones', 4),
  new Filter1('Production I.G', 10),
  new Filter1('Madhouse', 11),
  new Filter1('Toei Animation', 18),
  new Filter1('Studio Ghibli', 21),
  new Filter1('OLM', 28),
  new Filter1('Nippon Animation', 29),
  new Filter1('Studio Deen', 37),
  new Filter1('Ufotable', 43),
  new Filter1('Shaft', 44),
  new Filter1('Sunrise', 47),
  new Filter1('A-1 Pictures', 56),
  new Filter1('Genco', 79),
  new Filter1('Studio Pierrot', 91),
  new Filter1('Kyoto Animation', 112),
  new Filter1('White Fox', 314),
  new Filter1('MAPPA', 569),
  new Filter1('Wit Studio', 858),
  new Filter1('CloverWorks', 1835)
];



//вибрані filter
export const arrayGenres = [];
export const arrayTypes = [];
export const arrayYears = [];
export const arrayStudios = [];

