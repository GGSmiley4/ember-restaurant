import { Link } from 'react-router-dom';
import DishArt from '../components/DishArt';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import QuantityControl from '../components/QuantityControl';
import TotalsTable from '../components/TotalsTable';
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from '../components/Icons';
import { formatPrice } from '../utils/format';
import { calcTotals } from '../utils/pricing';

function Cart({ cart, changeQty, removeFromCart, clearCart }) {
  if (cart.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Your cart" title="Your cart is empty" />
        <section className="section section-tight">
          <div className="container">
            <EmptyState
              art={{ kind: 'drink', liquid: '#E9DED3', straw: '#C9B8AA' }}
              title="Nothing here yet"
              action={
                <Link to="/menu" className="btn btn-primary">
                  Browse the menu <ArrowRightIcon size={16} />
                </Link>
              }
            >
              Add a few dishes from the menu and they will show up here.
            </EmptyState>
          </div>
        </section>
      </>
    );
  }

  const totals = calcTotals(cart); 

  let count = 0;
  cart.forEach((item) => {
    count = count + item.qty;
  });

  return (
    <>
      <PageHeader eyebrow="Your cart" title={count === 1 ? '1 item in your cart' : count + ' items in your cart'} />
      <section className="section section-tight">
        <div className="container cart-layout">
          <div className="card cart-list">
            <div className="cart-list-head">
              <h2>Order items</h2>
              <button type="button" className="btn btn-text danger" onClick={clearCart}>
                <TrashIcon size={16} /> Clear cart
              </button>
            </div>

            <ul>
              {cart.map((item) => (
                <li key={item.id} className="cart-line">
                  <Link to={`/menu/${item.id}`} className="cart-thumb" style={{ '--tint': item.tint }}>
                    <DishArt art={item.art} />
                  </Link>
                  <div className="cart-line-info">
                    <Link to={`/menu/${item.id}`} className="cart-line-name">
                      {item.name}
                    </Link>
                    <span className="muted">{formatPrice(item.price)} each</span>
                  </div>
                  <QuantityControl value={item.qty} onChange={(newQty) => changeQty(item.id, newQty)} size="sm" />
                  <span className="cart-line-total">{formatPrice(item.price * item.qty)}</span>
                  <button type="button" className="icon-btn icon-btn-sm" onClick={() => removeFromCart(item.id)}>
                    <TrashIcon size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <Link to="/menu" className="link-arrow back">
              <ArrowLeftIcon size={16} /> Keep shopping
            </Link>
          </div>

          <aside className="card summary">
            <h2>Order summary</h2>
            <TotalsTable totals={totals} showHint />
            <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
              Go to checkout <ArrowRightIcon size={18} />
            </Link>
            <p className="fine-print">Taxes are estimated. You pay when your order arrives.</p>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Cart;
