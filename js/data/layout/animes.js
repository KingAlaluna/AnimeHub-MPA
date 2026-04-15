import {e, s} from '../initial-state.js';
import {Text4, Text5, Text6} from './texts.js';
import {Btn4} from './buttons.js';


export function AnimeWrap(props) {
  return e(
    'div',
    {
      className: 'anime-wrap border-4',
    },
    e(AnimeImg, {
      img: props.img || null,
      year: props.year || '',
      score: props.score || '',
      rank: props.rank || '',
      rating: props.rating || '',
    }),
    e(AnimeInfo, {
      title: props.title || '',
      genres: props.genres || '',
    }),
    e(InfoWrap, {
      studios: props.studios || '',
      episodes: props.episodes || '',
      duration: props.duration || '',
      status: props.status || '',
      
      onClickFav: props.onClickFav || null, 
      onClickView: props.onClickView || null,
      
      aniFavourite: props.aniFavourite || false, 
    }),
    
  );
}



function AnimeImg(props) {
  return e(
    'div',
    {
      style: {
        backgroundImage: `url(${props.img || null})`,
      },
      onClick: props.onClick || null,
      className: 'anime-img',
    },
    e(Text6, {text: props.year || '', bgColor: 'var(--color-2)', }),
    e(Text6, {text: props.score || '', left: 'auto', right: '0', brdRad: '0 0 0 10px', bgColor: 'var(--color-3)', icon: 'fa-star', }),
    e(Text6, {text: props.rank || '', left: 'auto', right: '0', top: 'auto', bottom: '0', brdRad: '10px 0 0 0', bgColor: 'var(--color-4)', icon: 'fa-ranking-star', }),
    e(Text6, {text: props.rating || '', top: 'auto', bottom: '0', brdRad: '0 10px 0 0', bgColor: 'var(--color-5)'}),
  );
}

export function AnimeViewImg(props) {
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

function AnimeInfo(props) {
  return e(
    'div',
    {
      className: 'anime-info',
    },
    e(Text5, {text: props.title || ''}),
    e(Text4, {text: props.genres || ''}),
  );
}


function InfoWrap(props) {
  return e(
    'div',
    {
      className: 'info-wrap',
    },
    e(Text4, {text: props.type || ''}),
    e(Text4, {text: props.studios || ''}),
    e(Text4, {text: props.episodes || ''}),
    e(Text4, {text: props.duration || ''}),
    e(Text4, {text: props.status || ''}),
    
    e(
      'div',
      {
        className: 'btn-wrap',
      },
      e(Btn4, {onClick: props.onClickFav || null, aniFavourite: props.aniFavourite || false, }),
      e(BtnAnimeView, {onClick: props.onClickView}),
    ),
  );
}


function BtnAnimeView(props) {
  return e(
    'button',
    {
      className: 'l-btn-1 btn-3 fa-solid fa-book-open',
      onClick: () => {
        props.onClick?.() || null;
      },
    },
    //'Деталі',
  )
}
//140



