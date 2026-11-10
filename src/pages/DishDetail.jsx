import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DishArt from '../components/DishArt';
import DishCard from '../components/DishCard';
import QuantityControl from '../components/QuantityControl';
import TagList from '../components/TagList';
import { ArrowLeftIcon, CartIcon, ClockIcon, FlameIcon } from '../components/Icons';
import { MENU, getDish } from '../data/menu';
import { formatPrice } from '../utils/format';
import NotFound from './NotFound';


function DishDetail({ cart, addToCart, changeQty, showMessage }) {
  const { dishId } = useParams(); // read the dish id from the address
  const [qty, setQty] = useState(1);

  const dish = getDish(dishId);
  if (!dish) {
    return <NotFound title="We couldn't find that dish" />;
  }

  const cartItem = cart.find((item) => item.id === dish.id);
  const inCart = cartItem ? cartItem.qty : 0;
  const others = MENU.filter((d) => d.id !== dish.id).slice(0, 3); // 3 other dishes for the bottom

  function handleAdd() {
    addToCart(dish, qty);
    showMessage(qty + ' × ' + dish.name + ' added to cart');
    setQty(1);
  }

  return (
    <>
      <section className="section section-tight">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/menu">
              <ArrowLeftIcon size={16} /> Menu
            </Link>
            <span>/</span>
            <Link to={`/menu?category=${dish.category}`}>{dish.category}</Link>
            <span>/</span>
            <span className="breadcrumb-current">{dish.name}</span>
          </nav>

          <div className="detail">
            <div className="detail-media" style={{ '--tint': dish.tint }}>
              <DishArt art={dish.art} title={dish.name} />
              <TagList tags={dish.tags} />
            </div>

            <div className="detail-info">
              <span className="eyebrow">{dish.category}</span>
              <h1>{dish.name}</h1>
              <ul className="detail-facts">
                <li>
                  <ClockIcon size={16} /> {dish.prepTime} min
                </li>
                <li>
                  <FlameIcon size={16} /> {dish.calories} kcal
                </li>
              </ul>
              <p className="lead">{dish.description}</p>

              <h2 className="detail-subhead">What&apos;s inside</h2>
              <ul className="ingredient-list">
                {dish.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="detail-buy">
                <span className="detail-price">{formatPrice(dish.price)}</span>
                <QuantityControl value={qty} onChange={setQty} />
                <button type="button" className="btn btn-primary btn-lg" onClick={handleAdd}>
                  <CartIcon size={18} /> Add {qty} · {formatPrice(dish.price * qty)}
                </button>
              </div>

              {inCart > 0 && (
                <p className="in-cart-note">
                  You have {inCart} in your cart. <Link to="/cart">View cart →</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">You might also like</span>
            <h2>More from our menu</h2>
          </div>
          <div className="dish-grid dish-grid-3">
            {others.map((d) => (
              <DishCard
                key={d.id}
                dish={d}
                cart={cart}
                addToCart={addToCart}
                changeQty={changeQty}
                showMessage={showMessage}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default DishDetail;
