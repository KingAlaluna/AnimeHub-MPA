import {e} from '../initial-state.js';
import {Text4, Text5} from './texts.js';
import {Url1} from './urls.js';


export function CharactersPanel(props) {
  return e(
    'div',
    {
      onClick: props.onClick || null,
      className: 'characters-panel border-6',
    },
    e(CharactersImg, {img: props.img || ''}),
    e(CharactersInfo, {
      name: props.name || '',
      role: props.role || '',
      url: props.url || '', href: props.href || '#',
      
    }),
  );
}

function CharactersImg(props) {
  return e(
    'div',
    {
      style: {
        backgroundImage: `url(${props.img || ''})`,
      },
      className: 'characters-img',
    },
    
  );
}

function CharactersInfo(props) {
  return e(
    'div',
    {
      className: 'characters-info',
    },
    e(Text5, {text: props.name || ''}),
    
    e(Text4, {text: props.role || ''}),
    e(Url1, {text: props.url || '', href: props.href || '#'}),
  );
}
//62
