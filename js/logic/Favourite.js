function Favourite() {
  const g = s();
  
  return e(
    'div',
    {
      style: {
        backgroundImage: 'var(--gradient-1)',
        height: 'max-content',
        minHeight: '100%',
      },
    },
    e(PanelRecomeng1, {text: 'Ваші улюбленні аніме:', animeFavourite: true,}),
    e(Pagination1),
    e(AllLawProtected1),
  );
}



//головна загальна логіка
function MainLogic() {
  //хуки
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkTheme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  const [isActBtn, setIsActBtn] = useState('fa-heart');
  
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
  const Displays = Favourite;
  
  
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

  return e(GlobalContext.Provider, { value: allState }, e(TopBanner), e(Weblite), e(BottomBanner));
}


const weblites = ReactDOM.createRoot(document.getElementById('weblite'));
weblites.render(e(MainLogic));