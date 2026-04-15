import {e, s} from '../initial-state.js';
import {Text1, Text3} from './texts.js';
import {Btn2, BtnFilter} from './buttons.js';
//import {} from 'module';

export function FilterSection(props) {
  return e(
    'section',
    {
      className: 'filter-section border-2',
    },
    e(Text1, {text: 'Виберіть фільтри:'}),
    e(FilterNav, {text: 'Жанри:', btnFilters: props.btnFilterGenres || null, array: props.arrayGenres || null, }),
    e(FilterNav, {text: 'Типи:', btnFilters: props.btnFiltersTypes || null, array: props.arrayTypes || null, isAc: 'ActAnimeType',}),
    e(FilterNav, {columns: true, text: 'Роки:', btnFilters: props.btnFiltersYears || null, array: props.arrayYears || null, isAc: 'ActAnimeYear',}),
    e(FilterNav, {text: 'Студії:', btnFilters: props.btnFiltersStudios || null, array: props.arrayStudios || null, }),
    e(Btn2, {text: 'Підтвердити', onClick: props.onClick || null}),
  );
}

function FilterNav(props) {
  return e(
    'nav',
    {
      className: 'filter-nav',
    },
    e(Text3, {text: props.text}),
    e(FilterWrap, {columns: props.columns || null, btnFilters: props.btnFilters || null, array: props.array || null, isAc: props.isAc || null,}),
  );
}

function FilterWrap(props) {
  const g = s();
  
  return e(
    'div',
    {
      className: `filter-wrap ${props.columns ? 'columns' : ''}`,
    },
    props?.btnFilters?.map?.((b, index) => 
      e(BtnFilter, {
        key: index,
        text: b.name,
        isAc: props.isAc || null,
        onClick: () => {
          if (props.isAc) {
            if (g[`is${props.isAc}`] !== b.name || g[`is${props.isAc}2`] !== true) {
              props.array.length = 0;
              props.array.push(b.url);
            } else {
              props.array.length = 0;
            }
          } else {
            const index = props?.array?.indexOf(b.url);
            if (index === -1) {
              props?.array?.push(b.url);
            } else {
              props?.array?.splice(index, 1);
            }
          }
        },
      }) || null,
    ),
  );
}
//113


