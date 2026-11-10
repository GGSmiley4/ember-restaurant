import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import StatusTracker from '../components/StatusTracker';
import TotalsTable from '../components/TotalsTable';
import { ClockIcon, MapPinIcon, PhoneIcon, CashIcon, CardIcon, CheckIcon } from '../components/Icons';
import { formatDateTime, formatPrice, formatTime } from '../utils/format';
import { TOTAL_SECONDS, getOrder, getProgress } from '../utils/orders';


function OrderTracking() {
  const { orderId } = useParams();
  const [now, setNow] = useState(Date.now());


  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const order = getOrder(orderId);

  if (!order) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            art={{ kind: 'drink', liquid: '#E9DED3', straw: '#C9B8AA' }}
            title="Order not found"
            action={
              <Link to="/track" className="btn btn-primary">
                Look up another order
              </Link>
            }
          >
            We couldn&apos;t find order <strong>{orderId}</strong> on this device. Check the code and try again.
          </EmptyState>
        </div>
      </section>
    );
  }

  const progress = getProgress(order.createdAt, now);


  const minutes = Math.floor(progress.secondsLeft / 60);
  const seconds = String(progress.secondsLeft % 60).padStart(2, '0');

  return (
    <section className="section section-tight">
      <div className="container">
        <div className={`card track-hero ${progress.done ? 'is-done' : ''}`}>
          <div className="track-hero-top">
            <div>
              <span className="eyebrow">Order {order.id}</span>
              <h1>{progress.done ? 'Delivered. Enjoy your meal!' : progress.stage.label + '…'}</h1>
              <p className="muted">Placed {formatDateTime(order.createdAt)}</p>
            </div>

            <div className="eta">
              {progress.done ? (
                <>
                  <span className="eta-icon done">
                    <CheckIcon size={22} />
                  </span>
                  <span>
                    <small>Arrived</small>
                    <strong>{formatTime(order.createdAt + TOTAL_SECONDS * 1000)}</strong>
                  </span>
                </>
              ) : (
                <>
                  <span className="eta-icon">
                    <ClockIcon size={22} />
                  </span>
                  <span>
                    <small>Arriving in</small>
                    <strong>
                      {minutes}:{seconds}
                    </strong>
                  </span>
                </>
              )}
            </div>
          </div>

          <StatusTracker progress={progress} />
          <p className="demo-note">Demo mode: the status moves forward every few seconds instead of minutes.</p>
        </div>

        <div className="track-grid">
          <div className="card">
            <h2>Delivery details</h2>
            <ul className="detail-list">
              <li>
                <MapPinIcon size={18} />
                <span>
                  <small>Address</small>
                  {order.customer.address}
                </span>
              </li>
              <li>
                <PhoneIcon size={18} />
                <span>
                  <small>Phone</small>
                  {order.customer.phone}
                </span>
              </li>
              <li>
                {order.payment === 'card' ? <CardIcon size={18} /> : <CashIcon size={18} />}
                <span>
                  <small>Payment</small>
                  {order.payment === 'card' ? 'Card on delivery' : 'Cash on delivery'}
                </span>
              </li>
              {order.customer.notes && (
                <li className="note">
                  <span>
                    <small>Notes</small>“{order.customer.notes}”
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="card summary">
            <h2>Receipt</h2>
            <ul className="summary-lines">
              {order.lines.map((line) => (
                <li key={line.id}>
                  <span className="summary-qty">{line.qty}×</span>
                  <span className="summary-name">{line.name}</span>
                  <span>{formatPrice(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>
            <TotalsTable totals={order.totals} />
            <Link to="/menu" className="btn btn-primary btn-block">
              Back to menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderTracking;
