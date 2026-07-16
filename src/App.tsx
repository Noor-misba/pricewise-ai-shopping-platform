import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { useRouter } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { LandingPage } from './pages/LandingPage';
import { SearchPage } from './pages/SearchPage';
import { ProductPage } from './pages/ProductPage';
import { DashboardPage } from './pages/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { WishlistPage } from './pages/WishlistPage';

function Pages() {
  const route = useRouter();

  return (
    <div className="min-h-screen">
      <Navbar route={route} />
      <main
        key={route.name + ('id' in route ? route.id : '') + ('query' in route ? route.query : '')}
        className="animate-fade-in"
      >
        {route.name === 'home' && <LandingPage />}
        {route.name === 'search' && <SearchPage query={route.query} />}
        {route.name === 'product' && <ProductPage id={route.id} />}
        {route.name === 'dashboard' && <DashboardPage />}
        {route.name === 'about' && <AboutPage />}
        {route.name === 'contact' && <ContactPage />}
        {route.name === 'login' && <LoginPage />}
        {route.name === 'wishlist' && <WishlistPage />}
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <ToastProvider>
          <Pages />
        </ToastProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
