import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import TotalsTable from '../components/TotalsTable';
import { ArrowLeftIcon, ArrowRightIcon, CardIcon, CashIcon } from '../components/Icons';
import { formatPrice } from '../utils/format';
import { calcTotals } from '../utils/pricing';
import { createOrderId, saveOrder } from '../utils/orders';


function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const phoneDigits = values.phone.replace(/\D/g, ''); 
  const address = values.address.trim();

  if (name === '') errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (!/^[a-zA-Z\s'-]+$/.test(name)) errors.name = 'Name can only contain letters, spaces, hyphens and apostrophes.';

  if (values.phone.trim() === '') errors.phone = 'Please enter a phone number.';
  else if (!/^[0-9\s()+-]+$/.test(values.phone)) errors.phone = 'Use numbers, spaces, +, - or brackets only.';
  else if (phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = 'Phone number should have 7 to 15 digits.';

  if (address === '') errors.address = 'Please enter a delivery address.';
  else if (address.length < 8) errors.address = 'Please add more detail (street and number).';

  if (values.notes.length > 200) errors.notes = 'Notes must be 200 characters or less.';

  if (values.payment === '') errors.payment = 'Choose how you would like to pay.';

  return errors;
}

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', phone: '', address: '', notes: '', payment: '' });
  const [touched, setTouched] = useState({});

  const totals = calcTotals(cart);
  const errors = validate(values);


  function errorFor(field) {
    if (touched[field]) return errors[field];
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    setTouched({ name: true, phone: true, address: true, notes: true, payment: true }); // show every error

    if (Object.keys(errors).length > 0) {
      return; 
    }

    const order = {
      id: createOrderId(),
      createdAt: Date.now(),
      customer: {
        name: values.name.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        notes: values.notes.trim(),
      },
      payment: values.payment,
      lines: cart.map((item) => ({ id: item.id, name: item.name, price: item.price, qty: item.qty })),
      totals: totals,
    };
    saveOrder(order);
    clearCart();
    navigate('/track/' + order.id); 
  }

  if (cart.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Nothing to check out" />
        <section className="section section-tight">
          <div className="container">
            <EmptyState
              art={{ kind: 'brownie' }}
              title="Your cart is empty"
              action={
                <Link to="/menu" className="btn btn-primary">
                  Browse the menu
                </Link>
              }
            >
              Add some food to your cart before checking out.
            </EmptyState>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Checkout" title="Where should we deliver?">
        Fill in your details and choose how to pay. No real payment is taken.
      </PageHeader>

      <section className="section section-tight">
        {/* noValidate turns off the browser's own pop-ups, so our messages show instead */}
        <form className="container checkout-layout" onSubmit={handleSubmit} noValidate>
          <div className="card form-card">
            <h2>Your details</h2>

            <div className={`field ${errorFor('name') ? 'has-error' : ''}`}>
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                onBlur={() => setTouched({ ...touched, name: true })}
              />
              {errorFor('name') && <p className="field-error">{errorFor('name')}</p>}
            </div>

            <div className={`field ${errorFor('phone') ? 'has-error' : ''}`}>
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                placeholder="08 123 456"
                value={values.phone}
                onChange={(e) => setValues({ ...values, phone: e.target.value })}
                onBlur={() => setTouched({ ...touched, phone: true })}
              />
              {errorFor('phone') ? (
                <p className="field-error">{errorFor('phone')}</p>
              ) : (
                <p className="field-hint">We&apos;ll call if the rider can&apos;t find you.</p>
              )}
            </div>

            <div className={`field ${errorFor('address') ? 'has-error' : ''}`}>
              <label htmlFor="address">Delivery address</label>
              <textarea
                id="address"
                rows={3}
                placeholder="Street, building, apartment, city"
                value={values.address}
                onChange={(e) => setValues({ ...values, address: e.target.value })}
                onBlur={() => setTouched({ ...touched, address: true })}
              />
              {errorFor('address') && <p className="field-error">{errorFor('address')}</p>}
            </div>

            <div className={`field ${errorFor('notes') ? 'has-error' : ''}`}>
              <label htmlFor="notes">
                Notes for the kitchen or rider <span className="optional">(optional)</span>
              </label>
              <input
                id="notes"
                type="text"
                placeholder="e.g. no onions, ring the bell twice"
                value={values.notes}
                onChange={(e) => setValues({ ...values, notes: e.target.value })}
                onBlur={() => setTouched({ ...touched, notes: true })}
              />
              {errorFor('notes') ? (
                <p className="field-error">{errorFor('notes')}</p>
              ) : (
                <p className="field-hint">{values.notes.length}/200</p>
              )}
            </div>

            <fieldset className={`field ${errorFor('payment') ? 'has-error' : ''}`}>
              <legend>Payment method</legend>
              <div className="pay-options">
                <label className={`pay-option ${values.payment === 'cash' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={values.payment === 'cash'}
                    onChange={() => setValues({ ...values, payment: 'cash' })}
                  />
                  <span className="pay-icon">
                    <CashIcon size={22} />
                  </span>
                  <span>
                    <strong>Cash</strong>
                    <small>Pay the rider when your food arrives</small>
                  </span>
                </label>

                <label className={`pay-option ${values.payment === 'card' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={values.payment === 'card'}
                    onChange={() => setValues({ ...values, payment: 'card' })}
                  />
                  <span className="pay-icon">
                    <CardIcon size={22} />
                  </span>
                  <span>
                    <strong>Card</strong>
                    <small>Pay by card on delivery (demo, no real charge)</small>
                  </span>
                </label>
              </div>
              {errorFor('payment') && <p className="field-error">{errorFor('payment')}</p>}
            </fieldset>
          </div>

          <aside className="card summary">
            <h2>Your order</h2>
            <ul className="summary-lines">
              {cart.map((item) => (
                <li key={item.id}>
                  <span className="summary-qty">{item.qty}×</span>
                  <span className="summary-name">{item.name}</span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <TotalsTable totals={totals} />
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Place order · {formatPrice(totals.total)} <ArrowRightIcon size={18} />
            </button>
            <Link to="/cart" className="link-arrow back">
              <ArrowLeftIcon size={16} /> Back to cart
            </Link>
          </aside>
        </form>
      </section>
    </>
  );
}

export default Checkout;
