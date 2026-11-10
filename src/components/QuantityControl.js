import { MinusIcon, PlusIcon, TrashIcon } from './Icons';


function QuantityControl({ value, onChange, allowZero = false, size = 'md' }) {
  const lowest = allowZero ? 0 : 1;
  const showBin = allowZero && value === 1;

  return (
    <div className={`qty qty-${size}`}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= lowest}>
        {showBin ? <TrashIcon size={15} /> : <MinusIcon size={15} />}
      </button>
      <output>{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= 20}>
        <PlusIcon size={15} />
      </button>
    </div>
  );
}

export default QuantityControl;
