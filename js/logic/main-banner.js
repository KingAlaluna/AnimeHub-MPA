import {e, s} from '../data/initial-state.js';
import {Btn1, Btn7, Btn8} from '../data/layout/buttons.js';


export function MainBanner() {
  return e(
    'div',
    {
      className: 'main-banner border-1',
    },
    e(LogoPanel),
    e(BtnPanel),
  );
}

function LogoPanel() {
  return e(
    'div',
    {
      className: 'logo-panel',
    },
    e(LogoImg),
    e(LogoText),
  );
}

function BtnPanel() {
  const g = s();
  return e(
    'div',
    {
      className: 'btn-panel',
    },
    e(Btn7, {className: 'fa-magnifying-glass', ariaLabel: 'Пошук аніме',
      onClick: () => location.href = 'anime-search.html', bg: g.isInputSearshAc ? 'var(--gradient-9)' : 'var(--gradient-5)' }),
    e(ThemeBtn, {}),
    
    e(Btn1, {className: 'fa-home', className2: 'btn-none', onClick: () => {
      location.href = 'index.html';
    }, ariaLabel: 'Головна сторінка'}),
    e(Btn1, {className: 'fa-sliders-h', className2: 'btn-none', onClick: () => {
      location.href = 'filter.html';
    }, ariaLabel: 'Фільтер аніме'}),
    e(Btn8, {className: 'fa-heart', className2: 'btn-none', onClick: () => {
      location.href = 'favourite.html';
    }, ariaLabel: 'Ваші улюблені аніме'}),
  );
}

function LogoImg() {
  return e(
    'div',
    {
      className: 'logo-img btn-1',
    },
    
  );
}

function LogoText() {
  return e(
    'h1',
    {
      className: 'logo-text title-1',
    },
    'AnimeHub',
  );
}


function ThemeBtn() {
  const g = s();
  return e(
    'button',
    {
      onClick: () => {
        g.setIsDarkTheme(!g.isDarkTheme);
        localStorage.setItem('darkTheme', !g.isDarkTheme);
      },
      className: 'theme-btn btn-1 title-2 fa-solid ' + (g.isDarkTheme == false ? ' fa-sun' : ' fa-moon'),
      ariaLabel: 'Перемикач теми',
    },
    
  );
}
//117