import { Link } from 'react-router-dom';
import DishArt from '../components/DishArt';
import PageHeader from '../components/PageHeader';
import { ArrowRightIcon, BoltIcon, HeartIcon, LeafIcon } from '../components/Icons';
import { getDish } from '../data/menu';

const VALUES = [
  { icon: LeafIcon, title: 'Fresh every day', text: 'Buns are baked each morning and vegetables arrive from local farms.' },
  { icon: BoltIcon, title: 'Fast, not rushed', text: 'Every order is cooked when it comes in, then sent straight out.' },
  { icon: HeartIcon, title: 'Fair to everyone', text: 'Clear prices, fair pay for our riders and no hidden fees.' },
];

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About us" title="A small grill with big flavour">
        Ember started as a weekend food stall. Today we cook for the whole neighbourhood, and you can order from
        your phone.
      </PageHeader>

      <section className="section">
        <div className="container split">
          <div className="split-art" style={{ '--tint': '#FFD9AE' }}>
            <DishArt art={getDish('classic-burger').art} />
          </div>
          <div>
            <span className="eyebrow">Our story</span>
            <h2>From a market stall to your table</h2>
            <p>
              We started with one grill, one recipe and a long line every Saturday. People kept asking if we could
              deliver, so we opened a kitchen and made this website to make ordering easy.
            </p>
            <p>
              Our menu is short on purpose. We would rather make a few things very well than lots of things that are
              just fine.
            </p>
            <Link to="/menu" className="link-arrow">
              See what we cook <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">What we care about</span>
            <h2>Our values</h2>
          </div>
          <div className="value-grid">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card value-card">
                <span className="step-icon">
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
