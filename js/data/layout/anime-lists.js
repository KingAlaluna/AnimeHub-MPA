import {e, s} from '../initial-state.js';
import {Text1} from './texts.js';
import {AnimeWrap} from './animes.js';
import { 
  useState,
  useEffect,
} from 'https://esm.sh/preact@10.20.1/hooks';


export function PanelAnimeList(props) {
  return e(
    'div',
    {
      className: 'panel-anime-list border-2',
    },
    e(Text1, {text: props.text}),
    e(WrapAnimeList, {timeout: props.timeout || null, row: props.row || null, animeUrl: props.animeUrl || null, animeFavourite: props.animeFavourite || null, }),
  );
}



function WrapAnimeList(props) {
  const g = s();
  const [animeLists, setAnimeLists] = useState([]);
  
  
  if (props.row) {
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/${props.animeUrl}`)
      .then(response => response.json())
      .then(data => {
        setAnimeLists(data.data); 
      })
      .catch(err => console.error("Помилка API:", err));
  }, []);
  } 
  
  else {
  const baseUrl = props.url || g.isAnimeUrl;
  if (!baseUrl) return;
  const finalUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${g.isPaginDocument}`;
  
  useEffect(() => {
    if (!props.animeFavourite) {
    const timer = setTimeout(() => {
      fetch(finalUrl)
        .then(response => response.json())
        .then(data => {
          setAnimeLists(data.data || []); 
          g.setIsAllPaginDocument(data.pagination?.last_visible_page);
        })
        .catch(err => {
          console.error("Помилка API:", err);
          setAnimeLists([]);
        });
    }, props.timeout || 2000);
    
    return () => clearTimeout(timer);
    } else {
      setAnimeLists(g.isAnimeFavourite.slice((g.isPaginDocument - 1) * 25, g.isPaginDocument * 25));
      g.setIsAllPaginDocument(Math.ceil(((g.isAnimeFavourite?.length || 0) / 25)) < 1 ? 1 : Math.ceil(g.isAnimeFavourite?.length / 25));
    }
  }, [g.isAnimeUrl, props.url, g.isAnimeFavourite, g.isPaginDocument]);
  }
  
  
  
  return e(
    'div',
    {
      lang: 'en',
      className: `wrap-anime-list ${props.row ? 'row' : ''}`,
    },
    
    
    animeLists && animeLists.length > 0 ? animeLists.map((anime) => {
      const alreadyFavorite = g.isAnimeFavourite.some(i => i.mal_id === anime.mal_id);
      
      return e(AnimeWrap, { 
        key: anime.mal_id,
        img: anime.images.webp.image_url,
        
        year: anime.year,
        score: anime.score,
        rank: anime.rank,
        rating: anime.rating ? (anime.rating.match(/\d+/)?.[0] + '+') || '' : '',
        
        title: anime.title,
        type: anime.type,
        studios : anime.studios?.map(e => e.name).join(', ') || '',
        episodes: anime.episodes,
        duration: anime.duration,
        status: anime.status,
        genres: anime.genres?.map(e => e.name).join(', ') || '',
        
        aniFavourite: alreadyFavorite, 
        
        onClickView: () => {
          location.href = 'anime-view.html';
          localStorage.setItem('animeViewing', JSON.stringify(anime));
        },
        
        onClickFav: () => {
          g.setIsAnimeFavourite(prev => {
            const alreadyFavorite = prev.some(i => i.mal_id === anime.mal_id);
            
            const newState = alreadyFavorite 
              ? prev.filter(it => it.mal_id !== anime.mal_id) 
              : [...prev, anime];
            
            localStorage.setItem('my_anime_favs', JSON.stringify(newState));
            return newState;
          });
        },
      });
    }) : null,
  );
}
//224
