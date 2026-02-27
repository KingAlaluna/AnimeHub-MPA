function AnimeViewing() {
  const g = s();
  return e(
    'div',
    {
      style: {
        height: 'max-content',
        minHeight: '100%',
        backgroundImage: 'var(--gradient-1)',
      },
      lang: 'en',
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
      style: {
        height: 'max-content',
        backgroundImage: 'var(--gradient-1)',
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        justifyItems: 'center',
      },
      className: 'anime-viewing-grid-1',
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
      style: {
        height: 'max-content',
      },
    },
    e(Anime2, {img: g.isAnimeData?.images?.webp?.large_image_url || null}),
    e(Button4, {width: '70%', aniFavourite: alreadyFavorite, 
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
      style: {
        ...grid2,
        height: 'max-content',
        width: '90%',
        borderRadius: '10px',
        ...border9,
        margin: '5vmin',
        alignItems: 'start',
      },
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
      style: {
        borderRadius: '10px',
        width: '90%',
        ...border9,
        margin: '5vmin',
      },
    },
    e(AVSynopsisPanel),
    e(AVSynopsisText),
  );
}

function AVSynopsisPanel() {
  return e(
    'summary',
    {
      style: {
        padding: 'clamp(10px, 5vmin, 20px)',
      },
    },
    'Опис'
  );
}

function AVSynopsisText() {
  const g = s();
  return e(
    'div',
    {
      style: {
        height: 'max-content',
        padding: '5vmin',
      },
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
      style: {
        width: '90%',
        height: '70vmin',
        borderRadius: '10px',
        margin: '5vmin',
      },
      src: g.isAnimeData.trailer?.embed_url || '',
      allow: `accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen`,
      title: 'Відео-плеєр трейлера',
      allowFullScreen: true,
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
      style: {
        height: 'max-content',
        margin: '5vmin',
        backgroundImage: 'var(--gradient-1)',
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        alignItems: 'start',
      },
      className: 'characters-grid-1',
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

  return e(GlobalContext.Provider, { value: allState }, e(TopBanner), e(Weblite), e(BottomBanner));
}


const weblites = ReactDOM.createRoot(document.getElementById('weblite'));
weblites.render(e(MainLogic));