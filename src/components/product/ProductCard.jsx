import { Link } from 'react-router';
import { AddShoppingCartIcon, FavoriteIcon } from '../../icons';

const ProductCard = ({ 
  id,
  name, 
  price, 
  originalPrice, 
  description, 
  image, 
  rating = 0, 
  reviews = 0,
  badge,
  badgeColor = 'amber-100',
  badgeTextColor = 'amber-800'
}) => {
  return (
    <div className="group flex flex-col gap-4">
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-slate-100">
        <Link to={`/products/${id}`}>
          <div 
            className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" 
            style={{ backgroundImage: `url(${image})` }}
            alt={name}
          />
        </Link>
        {badge && (
          <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
            badgeColor === 'red-50' ? 'bg-red-50 text-red-600' : 'bg-amber-100 text-amber-800'
          }`}>
            {badge}
          </div>
        )}
        <button className="absolute top-3 right-3 size-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[20px]"><FavoriteIcon /></span>
        </button>
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full h-10 bg-primary text-white text-sm font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]"><AddShoppingCartIcon /></span>
            Agregar
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <Link to={`/products/${id}`}>
            <p className="text-text-main text-lg font-bold leading-tight group-hover:text-primary transition-colors">
              {name}
            </p>
          </Link>
          <span className="font-bold text-primary">
            {originalPrice && (
              <span className="block text-xs text-gray-400 line-through">{originalPrice}</span>
            )}
            ${price}
          </span>
        </div>
        <p className="text-text-muted text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;

