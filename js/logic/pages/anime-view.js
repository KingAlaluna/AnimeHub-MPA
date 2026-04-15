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
import {AnimeViewImg} from '../../data/layout/animes.js';
import {CharactersPanel} from '../../data/layout/characters.js';


function AnimeViewing() {
  const g = s();
  return e(
    'div',
    {
      lang: 'en',
      className: 'page',
    },
    e(AVGrid, {}),
    e(AVSynopsis),
    e(Text1, {text: 'Трейлери:'}),
    e(AVTrailer),
    e(Text1, {text: 'Персонажі (натисніть на персонажа для більш детальноі інформації):'}),
    e(Characters),
    e(AllLawProtected1),
  );
}


function AVGrid() {
  return e(
    'div',
    {
      className: 'anime-view-grid',
    },
    e(AVimg),
    e(AVInfoGrid),
  );
}


function AVimg() {
  const g = s();
  const alreadyFavorite = g.isAnimeFavourite.some(i => i.mal_id === g.isAnimeData.mal_id);
  
  return e(
    'div',
    {
      className: 'img-wrap',
    },
    e(AnimeViewImg, {img: g.isAnimeData?.images?.webp?.large_image_url || null}),
    e(Btn4, {aniFavourite: alreadyFavorite, 
      onClick: () => {
        g.setIsAnimeFavourite(prev => {
          const alreadyFavorite = prev.some(i => i.mal_id === g.isAnimeData?.mal_id);
          
          const newState = alreadyFavorite 
            ? prev.filter(it => it.mal_id !== g.isAnimeData?.mal_id) 
            : [...prev, g.isAnimeData];
            
          localStorage.setItem('my_anime_favs', JSON.stringify(newState));
          return newState;
        });
      },
    }),
  )
}


//детальна інформація
function AVInfoGrid() {
  const g = s();
  
  return e(
    'div',
    {
      className: 'info-grid border-9',
    },
    e(Text7, {text: `Назва: ${g.isAnimeData.title || 'невідомо'}`,}),
    e(Text7, {text: `Оцінка: ${g.isAnimeData.score || 'невідомо'}`,}),
    e(Text7, {text: `Місце в топі: ${g.isAnimeData.rank || 'невідомо'}`,}),
    e(Text7, {text: `Рік: ${g.isAnimeData.year || 'невідомо'}`, }),
    e(Text7, {text: `Віковий рейтинг: ${g.isAnimeData.rating || 'невідомо'}`, }),
    e(Text7, {text: `Студія/ї: ${g.isAnimeData.studios?.map(e => e.name).join(', ') || 'невідомо'}`, }),
    e(Text7, {text: `Кількість епізодів: ${g.isAnimeData.episodes || 'невідомо'}`, }),
    e(Text7, {text: `Довжина епізода: ${g.isAnimeData.duration || 'невідомо'}`, }),
    e(Text7, {text: `Статус вихода: ${g.isAnimeData.status || 'невідомо'}`, }),
    e(Text7, {text: `Чи виходить тепер: ${g.isAnimeData.airing ? 'так' : 'ні'}`, }),
    e(Text7, {text: `Жанри: ${g.isAnimeData.genres?.map(e => e.name).join(', ') || 'невідомо'}`, }),
    e(Text7, {text: `Тематика: ${g.isAnimeData.themes?.map(e => e.name).join(', ') || 'невідомо'}`, }),
    e(Text7, {text: `Тип: ${g.isAnimeData.type || 'невідомо'}`, }),
    e(Text7, {text: `Первине джерело: ${g.isAnimeData.source || 'невідомо'}`, }),
  );
}


//опис
function AVSynopsis() {
  return e(
    'details',
    {
      className: 'anime-view-synopsis border-9',
    },
    e(AVSynopsisPanel),
    e(AVSynopsisText),
  );
}

function AVSynopsisPanel() {
  return e(
    'summary',
    {
      className: 'panel',
    },
    'Опис'
  );
}

function AVSynopsisText() {
  const g = s();
  return e(
    'div',
    {
      className: 'text-wrap',
    },
    g.isAnimeData.synopsis || 'Нажаль, опис відсутній...',
  );
}


//трейлер
function AVTrailer() {
  const g = s();
  return e(
    'iframe',
    {
      src: g.isAnimeData.trailer?.embed_url || '',
      allow: `accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen`,
      title: 'Відео-плеєр трейлера',
      allowFullScreen: true,
      className: 'anime-view-trailer',
    },
  );
}



//персонажі
//загальний контейнер
function Characters() {
  const g = s();
  const [isCharacters, setIsCharacters] = useState([]);
  
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${g.isAnimeData.mal_id}/characters`)
      .then(response => response.json())
      .then(data => {
        setIsCharacters(data.data); 
      })
      .catch(err => console.error("Помилка API:", err));
  }, []);
  
  
  return e(
    'div',
    {
      className: 'characters-wrap characters-grid-1',
    },
    isCharacters?.length > 0 ? isCharacters.map((c, index) => 
      e(CharactersPanel, {
        key: index,
        characters: c,
        
        img: c?.character?.images?.webp?.image_url,
        
        name: c?.character?.name ? `Ім'я: ${c?.character?.name}` : `Ім'я: невідомо`,
        role: c?.role ? `Роль: ${c?.role}` : `Роль: невідомо`,
        url: c?.character?.url ? `Посилання: ${c?.character?.url}` : `Посилання: невідомо`, href: c?.character?.url ? c?.character?.url : '#',
        
        
        onClick: () => {
          localStorage.setItem('character', JSON.stringify(c));
          location.href = 'info-characters.html';
        },
      })
    ) : null,
  );
}






//головна загальна логіка
function MainLogic() {
  //хуки
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkTheme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  
  //аніме
  const [isAnimeData, setIsAnimeData] = useState(JSON.parse(localStorage.getItem('animeViewing')) || []);
  const [isAnimeFavourite, setIsAnimeFavourite] = useState(JSON.parse(localStorage.getItem('my_anime_favs')) || []);
  
  
  
  //зміна теми
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);
  
  
  
  //дисплеи
  const Displays = AnimeViewing;
  
  
  //глобальная видимость
  let allState = {
    Displays,
    isDarkTheme,
    setIsDarkTheme,
    
    
    isAnimeData,
    setIsAnimeData,
    
    isAnimeFavourite,
    setIsAnimeFavourite,
  };

  return e(GlobalContext.Provider, { value: allState }, e(MainBanner), e(Root), e(BottomNav));
}


render(e(MainLogic), document.getElementById('root'));
//292