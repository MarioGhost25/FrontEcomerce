import { Link } from 'react-router';
import { SearchIcon, ShoppingCartIcon, StoreIcon, UserIcon } from '../../icons';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 lg:px-10 py-4 shadow-sm">
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-2 text-primary">
          <div className="size-8 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl"><StoreIcon /></span>
          </div>
          <Link to="/">
            <h2 className="text-primary text-xl font-black leading-tight tracking-[-0.015em]">E-Store</h2>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 lg:gap-9">
          <Link className="text-text-main hover:text-primary transition-colors text-sm font-medium leading-normal" to="/">
            Inicio
          </Link>
          <Link className="text-text-main hover:text-primary transition-colors text-sm font-medium leading-normal" to="/products">
            Tienda
          </Link>
          <Link className="text-text-main hover:text-primary transition-colors text-sm font-medium leading-normal" to="/products">
            Categorías
          </Link>
          <Link className="text-text-main hover:text-primary transition-colors text-sm font-medium leading-normal" to="#">
            Nosotros
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64 group">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-primary transition-all">
            <div className="text-text-muted flex border-none bg-slate-50 items-center justify-center pl-3 rounded-l-lg">
              <span className="material-symbols-outlined text-[20px]"><SearchIcon /></span>
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none border-none bg-slate-50 text-text-main focus:outline-0 focus:ring-0 placeholder:text-text-muted px-3 text-sm font-normal leading-normal" 
              placeholder="Buscar productos..." 
              type="search"
            />
          </div>
        </label>
        <div className="flex gap-3">
          <Link 
            to="/cart"
            className="flex items-center justify-center rounded-full size-10 bg-slate-50 hover:bg-slate-100 text-text-main transition-colors relative"
          >
            <span className="material-symbols-outlined"><ShoppingCartIcon /></span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">2</span>
          </Link>
          <Link 
            to="/user"
            className="flex items-center justify-center rounded-full size-10 bg-slate-50 hover:bg-slate-100 text-text-main transition-colors"
          >
            <span className="material-symbols-outlined"><UserIcon /></span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

