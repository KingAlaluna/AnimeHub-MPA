function TopBanner() {
  return e(
    'div',
    {
      style: {
        ...border1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 'clamp(60px, 10vh, 90px)',
        backgroundImage: 'var(--gradient-16), linear-gradient(var(--color-fff), var(--color-fff)), var(--gradient-17)',
        boxShadow: '0 0 2.5vh 2.5vh var(--color-1)',
        zIndex: '1',
      },
    },
    e(LogoPanel),
    e(BtnPanel),
  );
}

function LogoPanel() {
  return e(
    'div',
    {
      style: {
        flexDirection: 'row',
        width: 'max-content',
      },
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
      style: {
        flexDirection: 'row',
        width: 'max-content',
      },
    },
    e(Button7, {className: 'fa-magnifying-glass', onClick: () => location.href = 'anime-search.html', bg: g.isInputSearshAc ? 'var(--gradient-9)' : 'var(--gradient-5)' }),
    e(ThemeBtn, {}),
    
    e(Button1, {className: 'fa-home', className2: 'button1', onClick: () => {
      location.href = 'index.html';
    }}),
    e(Button1, {className: 'fa-sliders-h', className2: 'button1', onClick: () => {
      location.href = 'filter.html';
    }}),
    e(Button8, {className: 'fa-heart', className2: 'button1', onClick: () => {
      location.href = 'favourite.html';
    }}),
    e(Button1, {className: 'fa-laptop-code', className2: 'button1', onClick: () => {
      location.href = 'my-projects.html';
    }}),
    e(Button1, {className: 'fa-user-tie', className2: 'button1', onClick: () => {
      location.href = 'about-me.html';
    }}),
  );
}

function LogoImg() {
  return e(
    'div',
    {
      style: {
        ...button1,
        borderRadius: '10px',
        backgroundImage: 'url(img/logo.svg), var(--gradient-6)',
      },
    },
    
  );
}

function LogoText() {
  return e(
    'h1',
    {
      style: {
        ...title1,
        fontWeight: '900',
        fontFamily: 'Montserrat, sans-serif',
      },
    },
    'AnimeHub',
  );
}


function ThemeBtn() {
  const g = s();
  return e(
    'button',
    {
      style: {
        ...button1,
        ...title2,
        backgroundImage: 'var(--gradient-11), var(--gradient-10)',
      },
      onClick: () => {
        g.setIsDarkTheme(!g.isDarkTheme);
        localStorage.setItem('darkTheme', !g.isDarkTheme);
      },
      className: 'fa-solid ' + (g.isDarkTheme == false ? ' fa-sun' : ' fa-moon'),
    },
    
  );
}
