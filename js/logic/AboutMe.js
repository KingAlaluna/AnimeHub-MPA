function AboutMe() {
  return e(
    'div',
    {
      style: {
        backgroundImage: 'var(--gradient-1)',
        height: 'max-content',
        minHeight: '100%',
        overflow: 'auto',
      },
    },
    e(Text1, {text: 'Про цей проєкт та себе:'}),
    e(Markdown1, {text: aboutMeTexts}),
    e(AllLawProtected1),
  );
}




//головна загальна логіка
function MainLogic() {
  //хуки
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('darkTheme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  const [isActBtn, setIsActBtn] = useState('fa-user-tie');
  
  
  //зміна теми
  useEffect(() => {
    document.documentElement.dataset.theme = isDarkTheme ? 'dark' : 'light';
  }, [isDarkTheme]);
  
  
  
  //дисплеи
  const Displays = AboutMe;
  
  
  //глобальная видимость
  let allState = {
    Displays,
    isDarkTheme,
    setIsDarkTheme,
    isActBtn,
    setIsActBtn,
  };

  return e(GlobalContext.Provider, { value: allState }, e(TopBanner), e(Weblite), e(BottomBanner));
}


const weblites = ReactDOM.createRoot(document.getElementById('weblite'));
weblites.render(e(MainLogic));  