import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DishCard from '../components/DishCard';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { CloseIcon, SearchIcon } from '../components/Icons';
import { CATEGORIES, MENU } from '../data/menu';


function matchesSearch(dish, search) {
  const text = (dish.name + ' ' + dish.description + ' ' + dish.ingredients.join(' ')).toLowerCase();
  return text.includes(search.trim().toLowerCase());
}


function sortDishes(list, sort) {
  const copy = [...list];
  if (sort === 'price-low') copy.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') copy.sort((a, b) => b.price - a.price);
  if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));
  return copy;
}

function Menu({ cart, addToCart, changeQty, showMessage }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');



  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All';

  function chooseCategory(cat) {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  }

  function clearFilters() {
    setSearch('');
    chooseCategory('All');
  }


  const found = MENU.filter((dish) => matchesSearch(dish, search));
  const inCategory = found.filter((dish) => category === 'All' || dish.category === category);
  const results = sortDishes(inCategory, sort);


  function countFor(cat) {
    if (cat === 'All') return found.length;
    return found.filter((dish) => dish.category === cat).length;
  }

  return (
    <>
      <PageHeader eyebrow="Our menu" title="Find something delicious">
        Everything is cooked when you order it. Search by name or ingredient, or filter by category.
      </PageHeader>

      <section className="section section-tight">
        <div className="container">
          <div className="menu-toolbar">
            <label className="search-field">
              <SearchIcon size={18} />
              <input
                type="text"
                placeholder="Search dishes, e.g. “chicken” or “lemon”"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" className="search-clear" onClick={() => setSearch('')}>
                  <CloseIcon size={16} />
                </button>
              )}
            </label>

            <label className="sort-field">
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>

          <div className="chip-row">
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip ${category === cat ? 'is-active' : ''}`}
                onClick={() => chooseCategory(cat)}
              >
                {cat}
                <span className="chip-count">{countFor(cat)}</span>
              </button>
            ))}
          </div>

          <p className="result-count">
            Showing {results.length} of {MENU.length} dishes
          </p>

          {results.length > 0 ? (
            <div className="dish-grid">
              {results.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  cart={cart}
                  addToCart={addToCart}
                  changeQty={changeQty}
                  showMessage={showMessage}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              art={{ kind: 'donut', icing: '#C9B8AA' }}
              title="No dishes found"
              action={
                <button type="button" className="btn btn-primary" onClick={clearFilters}>
                  Clear filters
                </button>
              }
            >
              Nothing matches “{search}”. Try another word or category.
            </EmptyState>
          )}
        </div>
      </section>
    </>
  );
}

export default Menu;
