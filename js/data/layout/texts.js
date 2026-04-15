import {e} from '../initial-state.js';


export function Text1(props) {
  return e(
    props.type || 'h2',
    {
      style: {
      },
      className: 'text-1',
    },
    props.text,
  );
}


export function Text2(props) {
  return e(
    props.type || 'p',
    {
      style: {
      },
      className: 'text-1',
    },
    props.text,
  );
}


export function Text3(props) {
  return e(
    props.type || 'h3',
    {
      style: {
      },
      className: 'text-1',
    },
    props.text,
  );
}


export function Text4(props) {
  return e(
    props.type || 'div',
    {
      style: {
        display: props.text !=='' && props.text !=='#' && props.text !=='★' && props.text !=='+' && props.text !=='undefined' && props.text !=='undefined+' ? 'block' : 'none',
      },
      className: 'text-2 border-6',
    },
    props.text,
  );
}


export function Text5(props) {
  return e(
    props.type || 'h3',
    {
      style: {
      },
      className: 'text-3 title-3',
    },
    props.text,
  );
}


export function Text6(props) {
  return e(
    props.type || 'div',
    {
      style: {
        display: props.text !=='' && props.text !=='#' && props.text !=='★' && props.text !=='+' && props.text !==undefined && props.text !=='undefined+' ? 'block' : 'none',
        borderRadius: props.brdRad || '0 0 10px 0',
        background: props.bgColor || '#f30',
        top: props.top || '0',
        left: props.left || '0',
        right: props.right || 'auto',
        bottom: props.bottom || 'auto',
      },
      className: `text-4 fa-solid fa-solid-1 ${props.icon || ''} ${props.className || ''}`,
    },
    props.icon ? ` ${props.text}` : props.text,
  );
}


export function Text7(props) {
  return e(
    props.type || 'div',
    {
      style: {
        background: props.bgColor || 'var(--color-fff)'
      },
      className: 'text-5',
    },
    props.text,
  );
}
//126


