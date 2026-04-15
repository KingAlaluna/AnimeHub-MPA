import {e, s} from '../initial-state.js';
import { 
  useState,
} from 'https://esm.sh/preact@10.20.1/hooks';


export function Btn1(props) {
  const g = s();
  return e(
    'button',
    {
      style: {
        color: props.color || 'var(--color-000)',
        backgroundImage: props.bg ? (props.bg) : (g.isActBtn == props.className ? 'var(--gradient-9)' : 'var(--gradient-5)'),
      },
      onClick: () => {
        props.onClick?.() || null;
      },
      className: `btn-1 fa-solid ${props.className} ${(props.className2 ? props.className2 : '') || ''}`,
      ariaLabel: props.ariaLabel || '',
    },
    props.svg || null,
  );
}


export function Btn2(props) {
  return e(
    'button',
    {
      style: {
        background: props.bg || 'var(--gradient-7)',
      },
      onClick: props.onClick || null,
      className: 'btn-2 button-3',
    },
    props.text,
  );
}


export function Btn3(props) {
  return e(
    'button',
    {
      onClick: props.onClick || null,
      className: 'btn-3',
    },
    props.text,
  );
}


export function Btn4(props) {
  return e(
    'button',
    {
      style: {
        backgroundImage: props.aniFavourite ? 'var(--gradient-15), var(--gradient-13)' : 'var(--gradient-14), var(--gradient-12)',
      },
      onClick: () => {
        props.onClick?.() || null;
      },
      className: `l-btn-1 btn-3 title-2 fa-solid fa-heart`,
    },
    
  );
}


export function BtnFilter(props) {
  const g = s();
  const [isActive, setIsActive] = useState(false);
  
  return e(
    'button',
    {
      style: {
        background: props.isAc ? (g[`is${props.isAc}`] == props.text && g[`is${props.isAc}2`] == true ? 'var(--gradient-8)' : 'var(--gradient-5)') : (isActive ? 'var(--gradient-8)' : 'var(--gradient-5)'),
      },
      onClick: () => {
        props.isAc ? (g[`setIs${props.isAc}`](props.text)) : (setIsActive(!isActive));
        props.isAc ? (g[`is${props.isAc}`] !== props.text && g[`is${props.isAc}2`] == true ? g[`setIs${props.isAc}2`](true) : g[`setIs${props.isAc}2`](!g[`is${props.isAc}2`])) : null;
        props.onClick?.() || null;
      },
      className: 'btn-filter',
    },
    props.text,
  );
}


export function Btn7(props) {
  return e(
    'button',
    {
      style: {
        color: props.color || 'var(--color-000)',
        backgroundImage: props.bg ? (props.bg) : ('var(--gradient-5)'),
      },
      onClick: () => {
        props.onClick?.() || null;
      },
      className: 'btn-1 fa-solid ' + props.className || null,
      ariaLabel: props.ariaLabel || '',
    },
    props.svg || null,
  );
}


export function Btn8(props) {
  const g = s();
  return e(
    'button',
    {
      style: {
        backgroundImage: `${props.color ? props.color : 'var(--gradient-15)'}, ${props.bg ? (props.bg) : (g.isActBtn == props.className ? 'var(--gradient-9)' : 'var(--gradient-5)')}`,
      },
      onClick: () => {
        props.onClick?.() || null;
      },
      className: 'btn-1 title-2 fa-solid ' + props.className + ' ' + (props.className2 ? props.className2 : '') || null,
      ariaLabel: props.ariaLabel || '',
    },
    props.svg || null,
  );
}
//149


