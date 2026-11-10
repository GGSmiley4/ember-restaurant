import { STAGES } from '../utils/orders';
import { CheckIcon, ChefIcon, HomeIcon, ReceiptIcon, TruckIcon } from './Icons';


function stageIcon(key) {
  if (key === 'received') return <ReceiptIcon size={18} />;
  if (key === 'preparing') return <ChefIcon size={18} />;
  if (key === 'on-the-way') return <TruckIcon size={18} />;
  return <HomeIcon size={18} />;
}



function StatusTracker({ progress }) {
  return (
    <div className="tracker" style={{ '--progress': progress.percent + '%' }}>
      <div className="tracker-rail">
        <div className="tracker-fill" />
      </div>

      <ol className="tracker-steps">
        {STAGES.map((stage, i) => {
          
          let status = 'todo';
          if (i < progress.index || progress.done) {
            status = 'done';
          } else if (i === progress.index) {
            status = 'current';
          }

          return (
            <li key={stage.key} className={`tracker-step is-${status}`}>
              <span className="tracker-dot">{status === 'done' ? <CheckIcon size={18} /> : stageIcon(stage.key)}</span>
              <span className="tracker-text">
                <strong>{stage.label}</strong>
                <small>{stage.description}</small>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default StatusTracker;
