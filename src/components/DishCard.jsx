import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import DishArt from './DishArt';
import QuantityControl from './QuantityControl';
import { PlusIcon } from './Icons';
import TagList from './TagList';


function DishCard({ dish, cart, addToCart, changeQty, showMessage }) {
  // How many of this dish are already in the cart? (0 if none)
  const cartItem = cart.find((item) => item.id === dish.id);
  const qty = cartItem ? cartItem.qty : 0;

  function handleAdd() {
    addToCart(dish, 1);
    showMessage(dish.name + ' added to cart');
  }

  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.id}`} className="dish-media" style={{ '--tint': dish.tint }}>
        <DishArt art={dish.art} />
        <TagList tags={dish.tags} />
      </Link>

      <div className="dish-body">
        <span className="chip-sm">{dish.category}</span>
        <h3 className="dish-name">
          <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
        </h3>
        <p className="dish-desc">{dish.description}</p>

        <div className="dish-foot">
          <span className="price">{formatPrice(dish.price)}</span>

          {}
          {qty > 0 ? (
            <QuantityControl value={qty} onChange={(newQty) => changeQty(dish.id, newQty)} allowZero size="sm" />
          ) : (
            <button type="button" className="btn btn-primary btn-sm" onClick={handleAdd}>
              <PlusIcon size={16} /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default DishCard;
