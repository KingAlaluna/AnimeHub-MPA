import {e, s} from '../data/initial-state.js';


export function Root() {
  const g = s();
  return e(
    'div',
    {
      className: 'root',
    },
    e(g.Displays),
  );
}
//19