import DishArt from './DishArt';

export default function EmptyState({ art, title, children, action }) {
  return (
    <div className="empty-state">
      {art && <DishArt art={art} className="empty-art" />}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}
