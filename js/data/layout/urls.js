import {e} from '../initial-state.js';


export function Url1(props) {
  return e(
    'a',
    {
      style: {
        display: props.text !=='' && props.text !=='#' && props.text !=='★' && props.text !=='+' && props.text !==undefined && props.text !=='undefined+' ? 'block' : 'none',
      },
      href: props.href || '#',
      target: '_blank',
      rel: 'noopener, noreferrer',
      className: 'url-1 border-6',
    },
    props.text || '',
  );
}

export function Url2(props) {
  return e(
    'a',
    {
      style: {
        background: props.bgColor || 'var(--color-fff)',
      },
      href: props.href || '#',
      target: '_blank',
      rel: 'noopener, noreferrer',
      className: 'url-2',
    },
    props.text,
  );
}
//59


