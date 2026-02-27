function BottomBanner() {
  const g = s();
  return e(
    'div',
    {
      style: {
        ...position1,
        height: 'clamp(60px, 10%, 90px)',
        backdropFilter: 'blur(5px)',
        backgroundImage: 'var(--gradient-4)',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      className: 'panel-2',
    },
    e(Button1, {className: 'fa-home', onClick: () => {
      location.href = 'index.html';
    }}),
    e(Button1, {className: 'fa-sliders-h', onClick: () => {
      location.href = 'filter.html';
    }}),
    e(Button8, {className: 'fa-heart', onClick: () => {
      location.href = 'favourite.html';
    }}),
    e(Button1, {className: 'fa-laptop-code', onClick: () => {
      location.href = 'my-projects.html';
    }}),
    e(Button1, {className: 'fa-user-tie', onClick: () => {
      location.href = 'about-me.html';
    }}),
  );
}