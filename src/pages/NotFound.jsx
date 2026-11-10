import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

export default function NotFound({ title = 'Page not found' }) {
  return (
    <section className="section">
      <div className="container">
        <EmptyState
          art={{ kind: 'donut', icing: '#F57BA6' }}
          title={title}
          action={
            <div className="btn-row center">
              <Link to="/" className="btn btn-ghost">
                Go home
              </Link>
              <Link to="/menu" className="btn btn-primary">
                Browse the menu
              </Link>
            </div>
          }
        >
          The page you were looking for has been eaten. Let&apos;s get you back to the food.
        </EmptyState>
      </div>
    </section>
  );
}
