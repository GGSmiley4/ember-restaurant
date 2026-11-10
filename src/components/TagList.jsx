import { BoltIcon, LeafIcon } from './Icons';


function TagList({ tags }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="tag-list dish-tags">
      {tags.map((tag) => (
        <li key={tag} className={`tag tag-${tag.toLowerCase()}`}>
          {tag === 'Vegetarian' && <LeafIcon size={12} />}
          {tag === 'New' && <BoltIcon size={12} />} {tag}
        </li>
      ))}
    </ul>
  );
}

export default TagList;
