function Filter() {
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
    e(FilterPanel, {
      //кнопки параметрів сортування
      btnFilterGenres: filterGenres,
      btnFiltersTypes: filtersTypes,
      btnFiltersYears: filtersYears,
      btnFiltersStudios: filtersStudios,
      
      //вибрані параметри сортування
      arrayGenres,
      arrayTypes,
      arrayYears,
      arrayStudios,
      
      //підтвердити вибрані параметри
      onClick: () => {
        g.setIsPaginDocument(1);
        g.setIsAnimeUrl(buildAnimeUrl({
          arrayGenres,
          arrayTypes,
          arrayYears,
          arrayStudios,
        }));
      },
    }),
    e(PanelRecomeng1, {text: 'Результати фільтра:', url: g.isAnimeUrl, timeout: 0, }),
    e(Pagination1),
    e(AllLawProtected1),
  );
}


//новий url для фільтрації аніме
function buildAnimeUrl(props) {
  const baseUrl = 'https://api.jikan.moe/v4/anime';
  const params = new URLSearchParams();
  
  // Додаємо жанри
  if (props.arrayGenres.length > 0) {
    params.append('genres', props.arrayGenres.join(','));
  }
  // Додаємо студії
  if (props.arrayStudios.length > 0) {
    params.append('producers', props.arrayStudios.join(','));
  }
  // Додаємо тип
  if (props.arrayTypes.length > 0) {
    params.append('type', props.arrayTypes[0]);
  }
  // Додаємо рік
  if (props.arrayYears.length > 0) {
    params.append('start_date', `${props.arrayYears[0]}-01-01`);
  }

  return `${baseUrl}?${params.toString()}`;
}



//головна загальна логіка
function MainLogic() {
  //хуки
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkTheme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  const [isActBtn, setIsActBtn] = useState('fa-sliders-h');
  
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
  const Displays = Filter;
  
  
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