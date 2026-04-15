import {} from '../main-logic.js';

import {render} from 'https://esm.sh/preact@10.20.1';
import {e, GlobalContext, s} from '../../data/initial-state.js';
import { 
  useState,
  useEffect,
  //useContext
} from 'https://esm.sh/preact@10.20.1/hooks';

import {MainBanner} from '../main-banner.js';
import {BottomNav} from '../bottom-nav.js';
import {Root} from '../root.js';
import {Pagination1} from '../../data/layout/paginations.js';
import {AllLawProtected1} from '../../data/layout/footer-copy.js';
import {Text1, Text7} from '../../data/layout/texts.js';
import {Btn4} from '../../data/layout/buttons.js';
//import {AnimeViewImg} from '../../data/layout/animes.js';
import {CharactersPanel} from '../../data/layout/characters.js';
import {Url2} from '../../data/layout/urls.js';


function InfoActors() {
  const g = s();
  const c = g.isCurrActors;
  return e(
    'div',
    {
      lang: 'en',
      className: 'page',
    },
    e(ActorsGrid),
    e(AllLawProtected1),
  );
}



function ActorsGrid() {
  const g = s();
  const c = g.isCurrActors;
  
  return e(
    'div',
    {
      className: 'actors-grid',
    },
    e(ActorsImg2, {
      img: c?.person?.images?.jpg?.image_url,
    }),
    
    e(InfoActorsPanel),
  );
}



function ActorsImg2(props) {
  return e(
    'div',
    {
      style: {
        backgroundImage: `url(${props.img || null}), var(--gradient-18)`,
      },
      className: 'img-view border-4',
    },
    
  );
}


function InfoActorsPanel() {
  const g = s();
  const c = g.isCurrActors;
  
  const [isSynopsis, setIsSynopsis] = useState('');
  
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/people/${c?.person?.mal_id}/full`)
      .then(response => response.json())
      .then(data => {
        setIsSynopsis(data.data); 
      })
      .catch(err => console.error("Помилка API:", err));
  }, []);
  
  
  return e(
    'div',
    {
      className: 'info-wrap',
    },
    e(AInfoGrid, {
      favorites: isSynopsis?.favorites ? `Кількість фаворитів: ${isSynopsis?.favorites}` : `Кількість фаворитів: невідомо`,
      anime: isSynopsis?.anime ? `В аніме: ${isSynopsis?.anime?.map(e => e.anime.title).join(', ')}` : `В аніме: невідомо`,
      manga: isSynopsis?.manga ? `В мангах: ${isSynopsis?.manga?.map(e => e.manga.title).join(', ')}` : `В мангах: невідомо`,
    }),
    e(Text1, {text: 'Біографія:'}),
    e(ASynopsisText, {
      about: isSynopsis?.about,
    }),
  );
}




//детальна інформація
function AInfoGrid(props) {
  const g = s();
  const c = g.isCurrActors;
  
  return e(
    'div',
    {
      lang: 'en',
      className: 'info-grid grid-2 border-5',
    },
    e(Text7, {text: c?.person?.name ? `Ім'я: ${c?.person?.name}` : `Ім'я: невідомо`, }),
    e(Text7, {text: c?.language ? `Мова: ${c?.language}` : `Мова: невідомо`, }),
    e(Url2, {text: c?.person?.url ? `Посилання: ${c?.person?.url}` : `Посилання: невідомо`, href: c?.person?.url ? c?.person?.url : '#', }),
    
    e(Text7, {text: props.favorites || '', }),
    e(Text7, {text: props.anime || '', }),
    e(Text7, {text: props.manga || '', }),
  );
} 



//біографія персонажа
function ASynopsisText(props) {
  return e(
    'div',
    {
      lang: 'en',
      className: 'synopsis-text',
    },
    props.about || 'Нажаль, біографія цього актора невідома...',
  );
}






//головна загальна логіка
function MainLogic() {
  //хуки
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkTheme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  
  const [isCurrActors, setIsCurrActors] = useState(JSON.parse(localStorage.getItem('actor')) || []);
  
  
  
  //зміна теми
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);
  
  
  
  //дисплеи
  const Displays = InfoActors;
  
  
  //глобальная видимость
  let allState = {
    Displays,
    isDarkTheme,
    setIsDarkTheme,
    
    isCurrActors,
    setIsCurrActors,
  };

  return e(GlobalContext.Provider, { value: allState }, e(MainBanner), e(Root), e(BottomNav));
}


render(e(MainLogic), document.getElementById('root'));
//217