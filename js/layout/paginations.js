import {e, s} from '../data/initial-state.js';
import {Btn7} from './btns.js';
import {Text2} from './texts.js';


export function Pagination1() {
  const g = s();
  return e(
    'div',
    {
      className: 'pagination-1',
    },
    e(Btn7, {className: 'fa-arrow-left',
      onClick: () => {
        g.isPaginDocument >1 ? g.setIsPaginDocument(g.isPaginDocument - 1) : null;
      },
    }),
    e(Text2, {text: `${g.isPaginDocument} / ${g.isAllPaginDocument}`}),
    e(Btn7, {className: 'fa-arrow-right',
      onClick: () => {
        g.isPaginDocument < g.isAllPaginDocument ? g.setIsPaginDocument(g.isPaginDocument + 1) : null;
      },
    }),
  );
}
//31


