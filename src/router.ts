import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'search'; query: string }
  | { name: 'product'; id: string }
  | { name: 'dashboard' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'login' }
  | { name: 'wishlist' };

function parse(hash: string): Route {
  const h = hash.replace(/^#\/?/, '');
  const [path, ...rest] = h.split('/');
  if (path === 'search') return { name: 'search', query: decodeURIComponent(rest.join('/') ?? '') };
  if (path === 'product') return { name: 'product', id: rest[0] ?? '' };
  if (path === 'about') return { name: 'about' };
  if (path === 'contact') return { name: 'contact' };
  if (path === 'login') return { name: 'login' };
  if (path === 'wishlist') return { name: 'wishlist' };
  if (path === 'dashboard') return { name: 'dashboard' };
  return { name: 'home' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(route: Route) {
  let hash = '#/';
  switch (route.name) {
    case 'home':
      hash = '#/';
      break;
    case 'search':
      hash = `#/search/${encodeURIComponent(route.query)}`;
      break;
    case 'product':
      hash = `#/product/${route.id}`;
      break;
    case 'about':
      hash = '#/about';
      break;
    case 'contact':
      hash = '#/contact';
      break;
    case 'login':
      hash = '#/login';
      break;
    case 'wishlist':
      hash = '#/wishlist';
      break;
    case 'dashboard':
      hash = '#/dashboard';
      break;
  }
  window.location.hash = hash;
}
