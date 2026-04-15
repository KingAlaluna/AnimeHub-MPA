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
import {PanelAnimeList} from '../../data/layout/anime-lists.js';
import {Pagination1} from '../../data/layout/paginations.js';
import {AllLawProtected1} from '../../data/layout/footer-copy.js';


function InputSearch() {
  const g = s();
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      g.setIsPaginDocument(1);
      g.setIsAnimeUrl(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(event.target.value)}`);
    }
  };
  
  return e(
    'input',
    {
      type: 'search',
      placeholder: 'Введіть назву аніме...',
      onKeyDown: handleKeyDown,
      className: 'input-search border-4',
    },
    
  );
}


function AnimeSearch() {
  const g = s();
  
  return e(
    'div',
    {
      className: 'page',
    },
    e(InputSearch),
    e(PanelAnimeList, {text: 'Результати пошуку:', url: g.isAnimeUrl, timeout: 0,}),
    e(Pagination1),
    e(AllLawProtected1),
  );
}




//головна загальна логіка
function MainLogic() {
  //хуки
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkTheme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  const [isActBtn, setIsActBtn] = useState('fa-home');
  
  //аніме
  const [isAnimeData, setIsAnimeData] = useState([]);
  const [isAnimeUrl, setIsAnimeUrl] = useState('https://api.jikan.moe/v4/anime');
  const [isActAnimeType, setIsActAnimeType] = useState('');
  const [isActAnimeYear, setIsActAnimeYear] = useState('');
  const [isActAnimeType2, setIsActAnimeType2] = useState(false);
  const [isActAnimeYear2, setIsActAnimeYear2] = useState(false);
  const [isAnimeFavourite, setIsAnimeFavourite] = useState(JSON.parse(localStorage.getItem('my_anime_favs')) || []);
  
  
  //пагінація
  const [isPaginDocument, setIsPaginDocument] = useState(1);
  const [isAllPaginDocument, setIsAllPaginDocument] = useState(1);
  
  
  
  //зміна теми
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);
  
  
  
  //дисплеи
  const Displays = AnimeSearch;
  
  
  //глобальная видимость
  let allState = {
    Displays,
    isDarkTheme,
    setIsDarkTheme,
    isActBtn,
    setIsActBtn,
    
    
    isAnimeData,
    setIsAnimeData,
    isAnimeUrl,
    setIsAnimeUrl,
    
    isActAnimeType,
    setIsActAnimeType,
    isActAnimeYear,
    setIsActAnimeYear,
    
    isActAnimeType2,
    setIsActAnimeType2,
    isActAnimeYear2,
    setIsActAnimeYear2,
    
    isAnimeFavourite,
    setIsAnimeFavourite,
    
    
    //пагінація
    isPaginDocument,
    setIsPaginDocument,
    isAllPaginDocument,
    setIsAllPaginDocument,
  };

  return e(GlobalContext.Provider, { value: allState }, e(MainBanner), e(Root), e(BottomNav));
}


render(e(MainLogic), document.getElementById('root'));
//146