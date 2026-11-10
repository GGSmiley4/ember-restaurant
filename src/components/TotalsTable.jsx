import { formatPrice } from '../utils/format';
import { FREE_DELIVERY_MIN, TAX_RATE } from '../utils/pricing';


export default function TotalsTable({ totals, showHint = false }) {
  const missing = FREE_DELIVERY_MIN - totals.subtotal;
  return (
    <dl className="totals">
      <div>
        <dt>Subtotal</dt>
        <dd>{formatPrice(totals.subtotal)}</dd>
      </div>
      <div>
        <dt>Tax ({Math.round(TAX_RATE * 100)}%)</dt>
        <dd>{formatPrice(totals.tax)}</dd>
      </div>
      <div>
        <dt>Delivery</dt>
        <dd>{totals.delivery === 0 ? <span className="free">Free</span> : formatPrice(totals.delivery)}</dd>
      </div>
      {showHint && missing > 0 && (
        <p className="delivery-hint">
          Add <strong>{formatPrice(missing)}</strong> more for free delivery.
          <span className="hint-bar">
            <span style={{ width: `${Math.min(100, (totals.subtotal / FREE_DELIVERY_MIN) * 100)}%` }} />
          </span>
        </p>
      )}
      <div className="totals-total">
        <dt>Total</dt>
        <dd>{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}
