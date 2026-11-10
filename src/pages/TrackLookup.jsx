import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { ArrowRightIcon } from '../components/Icons';
import { getOrder } from '../utils/orders';

export default function TrackLookup() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError('Enter the order code you got after checkout, e.g. EB-7KX2QP.');
      return;
    }
    if (!getOrder(trimmed)) {
      setError(`No order with code ${trimmed} was found.`);
      return;
    }
    navigate(`/track/${trimmed}`);
  };

  return (
    <>
      <PageHeader eyebrow="Order tracking" title="Where's my food?">
        Enter your order code to see its live status.
      </PageHeader>

      <section className="section section-tight">
        <div className="container narrow">
          <form className="card lookup-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="order-code">Order code</label>
            <div className="lookup-row">
              <input
                id="order-code"
                type="text"
                placeholder="EB-XXXXXX"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
                }}
                aria-invalid={error !== ''}
              />
              <button type="submit" className="btn btn-primary">
                Track <ArrowRightIcon size={16} />
              </button>
            </div>
            {error && <p className="field-error">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
