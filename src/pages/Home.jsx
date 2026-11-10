import { Link } from 'react-router-dom';
import DishArt from '../components/DishArt';
import { ArrowRightIcon, FlameIcon } from '../components/Icons';
import { CATEGORIES, CATEGORY_META, MENU, getDish } from '../data/menu';

export default function Home() {
  return (
    <>
      {}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <FlameIcon size={15} /> Made fresh when you order
            </span>
            <h1>
              Hot from the grill, <span className="highlight">at your door</span> in 30 minutes.
            </h1>
            <p className="lead">
              Burgers, cold drinks and sweet desserts. Order in a few clicks and follow your food from our kitchen
              to your table.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary btn-lg">
                Order now <ArrowRightIcon size={18} />
              </Link>
              <Link to="/track" className="btn btn-ghost btn-lg">
                Track an order
              </Link>
            </div>
            <ul className="hero-stats">
              <li>
                <strong>{MENU.length}</strong>
                <span>dishes</span>
              </li>
              <li>
                <strong>{CATEGORIES.length}</strong>
                <span>categories</span>
              </li>
              <li>
                <strong>~30 min</strong>
                <span>delivery</span>
              </li>
            </ul>
          </div>

          <div className="hero-visual">
            <div className="hero-blob" />
            <DishArt art={getDish('classic-burger').art} className="hero-main" />
            <div className="hero-float float-a">
              <DishArt art={getDish('mint-lemonade').art} />
            </div>
            <div className="hero-float float-b">
              <DishArt art={getDish('glazed-donut').art} />
            </div>
            <div className="hero-badge">
              <strong>Free delivery</strong>
              <span>on orders over $25</span>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Categories</span>
            <h2>What are you craving?</h2>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const count = MENU.filter((d) => d.category === cat).length;
              return (
                <Link key={cat} to={`/menu?category=${cat}`} className="category-tile" style={{ '--tint': meta.tint }}>
                  <div className="category-art">
                    <DishArt art={meta.art} />
                  </div>
                  <div className="category-text">
                    <h3>{cat}</h3>
                    <p>{meta.blurb}</p>
                    <span className="category-count">{count} items</span>
                  </div>
                  <ArrowRightIcon className="category-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
