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
//import {Anime2} from '../../data/layout/animes.js';
import {CharactersPanel} from '../../data/layout/characters.js';
import {Url2} from '../../data/layout/urls.js';


function InfoCharacters() {
  const g = s();
  const c = g.isCurrCharacter;
  return e(
    'div',
    {
      lang: 'en',
      className: 'page',
    },
    e(CharactersGrid),
    e(Text1, {text: 'Актори/актриси озвучки (натисніть на актора/актрису для більш детальноі інформації):'}),
    e(Actors, {characters: c}),
    e(AllLawProtected1),
  );
}



function CharactersGrid() {
  const g = s();
  const c = g.isCurrCharacter;
  
  return e(
    'div',
    {
      className: 'characters-grid',
    },
    e(CharactersImg2, {
      img: c?.character?.images?.webp?.image_url,
    }),
    
    e(InfoCharactersPanel),
  );
}



function CharactersImg2(props) {
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


function InfoCharactersPanel() {
  const g = s();
  const c = g.isCurrCharacter;
  
  console.log('c', c);
  
  const [isSynopsis, setIsSynopsis] = useState();
  
  useEffect(() => {
    async function run() {
      try {
        const recult = await fetch(`https://api.jikan.moe/v4/characters/${c.character.mal_id}/full`);
        const response = await recult.json();
        setIsSynopsis(response.data.data);
      } catch (e) {
        console.error('Помилка API:', e);
      }
    }
    run();
  }, []);
  
  console.log('isSynopsis', isSynopsis);
  
  return e(
    'div',
    {
      className: 'info-wrap',
    },
    e(CharInfoGrid, {
      favorites: `Кількість фаворитів: ${isSynopsis?.favorites}` || `Кількість фаворитів: невідомо`,
      anime: `В аніме: ${isSynopsis?.anime?.map(e => e?.anime?.title).join(', ')}` || `В аніме: невідомо`,
      manga: `В мангах: ${isSynopsis?.manga?.map(e => e?.manga?.title).join(', ')}` || `В мангах: невідомо`,
    }),
    e(Text1, {text: 'Біографія:'}),
    e(SynopsisText, {
      about: isSynopsis?.about,
    }),
  );
}




//детальна інформація
function CharInfoGrid(props) {
  const g = s();
  const c = g.isCurrCharacter;
  
  return e(
    'div',
    {
      className: 'info-grid border-5 grid-2',
    },
    e(Text7, {text: c?.character?.name ? `Ім'я: ${c?.character?.name}` : `Ім'я: невідомо`, }),
    e(Text7, {text: c?.role ? `Роль: ${c?.role}` : `Роль: невідомо`, }),
    e(Url2, {text: c?.character?.url ? `Посилання: ${c?.character?.url}` : `Посилання: невідомо`, href: c?.character?.url ? c?.character?.url : '#', }),
    
    e(Text7, {text: props.favorites, }),
    e(Text7, {text: props.anime, }),
    e(Text7, {text: props.manga, }),
  );
} 



//біографія персонажа
function SynopsisText(props) {
  return e(
    'div',
    {
      className: 'synopsis-text',
    },
    props.about || 'Нажаль, біографія цього персонажа невідома...',
  );
}




//актори
function Actors(props) {
  const g = s();
  return e(
    'div',
    {
      className: 'actors characters-wrap',
    },
    
    props.characters?.voice_actors?.map((v, index) => 
      e(CharactersPanel, {
        key: index,
        
        img: v?.person?.images?.jpg?.image_url,
        
        name: v?.person?.name ? `Ім'я: ${v?.person?.name}` : `Ім'я: невідомо`,
        role: v?.language ? `Мова: ${v?.language}` : `Мова: невідомо`,
        url: v?.person?.url ? `Посилання: ${v?.person?.url}` : `Посилання: невідомо`, href: v?.person?.url ? v?.person?.url : '#',
        
        onClick: () => {
          localStorage.setItem('actor', JSON.stringify(v));
          location.href = 'info-actors.html';
        },
      }),
    ),
  );
}





//головна загальна логіка
function MainLogic() {
  //хуки
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkTheme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  
  const [isCurrCharacter, setIsCurrCharacter] = useState(JSON.parse(localStorage.getItem('character')) || []);
  
  
  //зміна теми
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);
  
  
  
  //дисплеи
  const Displays = InfoCharacters;
  
  
  //глобальная видимость
  let allState = {
    Displays,
    isDarkTheme,
    setIsDarkTheme,
    
    isCurrCharacter,
    setIsCurrCharacter,
  };

  return e(GlobalContext.Provider, { value: allState }, e(MainBanner), e(Root), e(BottomNav));
}


render(e(MainLogic), document.getElementById('root'));
//255