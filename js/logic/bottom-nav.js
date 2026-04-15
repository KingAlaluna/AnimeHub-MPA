import {e, s} from '../data/initial-state.js';
import {Btn1, Btn7, Btn8} from '../data/layout/buttons.js';


export function BottomNav() {
  const g = s();
  return e(
    'nav',
    {
      className: 'bottom-nav position-1 panel-2',
    },
    e(Btn1, {className: 'fa-home', onClick: () => {
      location.href = 'index.html';
    }, ariaLabel: 'Головна сторінка'}),
    e(Btn1, {className: 'fa-sliders-h', onClick: () => {
      location.href = 'filter.html';
    }, ariaLabel: 'Фільтер аніме'}),
    e(Btn8, {className: 'fa-heart', onClick: () => {
      location.href = 'favourite.html';
    }, ariaLabel: 'Ваші улюблені аніме'}),
  );
}
//37