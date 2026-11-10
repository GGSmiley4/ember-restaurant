
function DishArt({ art, className = '', title }) {
  let drawing;
  if (art.kind === 'drink') {
    drawing = <Drink liquid={art.liquid} straw={art.straw} cup={art.cup} lid={art.lid} lemon={art.lemon} ice={art.ice} />;
  } else if (art.kind === 'donut') {
    drawing = <Donut icing={art.icing} />;
  } else if (art.kind === 'brownie') {
    drawing = <Brownie />;
  } else {
    drawing = <Burger bun={art.bun} patty={art.patty} cheese={art.cheese} />;
  }

  return (
    <svg className={`dish-art ${className}`} viewBox="0 0 200 160">
      {title && <title>{title}</title>}
      {/* shadow under the food */}
      <ellipse cx="100" cy="146" rx="70" ry="7" fill="rgba(0,0,0,.13)" />
      {drawing}
    </svg>
  );
}


function Burger({ bun, patty, cheese }) {
  const seeds = [
    [70, 46],
    [96, 40],
    [124, 46],
    [84, 62],
    [112, 60],
    [140, 64],
    [58, 66],
  ];
  return (
    <g>
      {/* bottom bun */}
      <rect x="32" y="112" width="136" height="26" rx="13" fill={bun} />
      {/* patty */}
      <rect x="34" y="96" width="132" height="18" rx="9" fill={patty} />
      {/* cheese */}
      {cheese && <path d="M36 96H164L160 104l-10-6-12 10-12-10-14 8-12-6-12 8-12-8-14 6-12-6-10 4z" fill="#FFC93C" />}
      {/* tomato */}
      <rect x="40" y="86" width="120" height="11" rx="5.5" fill="#E2483B" />
      {/* lettuce */}
      <path d="M28 82h144v6q-9 9-18 0t-18 0-18 0-18 0-18 0-18 0-18 0-18 0z" fill="#7CC456" />
      {/* top bun */}
      <path d="M30 84C30 44 62 26 100 26s70 18 70 58q0 6-6 6H36q-6 0-6-6z" fill={bun} />
      {seeds.map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="4" ry="2.2" fill="#FFF3D6" />
      ))}
    </g>
  );
}


function Drink({ liquid, straw, cup, lid, lemon, ice }) {
  return (
    <g>
      {/* straw */}
      <path d="M112 50L126 6" stroke={straw} strokeWidth="7" strokeLinecap="round" />
      {/* cup: coloured paper cup, or a glass showing the drink */}
      <path d="M62 40h76l-10 98q-1 6-8 6H80q-7 0-8-6z" fill={cup || liquid} />
      {cup ? (
        <rect x="68" y="80" width="64" height="30" fill="rgba(255,255,255,.9)" />
      ) : (
        <path d="M62 40h76l-1.5 14h-73z" fill="rgba(255,255,255,.6)" />
      )}
      {ice && (
        <g fill="rgba(255,255,255,.55)">
          <rect x="74" y="62" width="18" height="18" rx="4" />
          <rect x="100" y="68" width="18" height="18" rx="4" />
          <rect x="86" y="88" width="16" height="16" rx="4" />
        </g>
      )}
      {lid && <rect x="56" y="32" width="88" height="11" rx="5.5" fill="#F4F0EA" />}
      {lemon && (
        <g>
          <circle cx="64" cy="38" r="16" fill="#F5D33F" />
          <circle cx="64" cy="38" r="12" fill="#FFF3A6" />
        </g>
      )}
    </g>
  );
}


function Donut({ icing }) {
  const sprinkles = [
    [70, 70, '#FFD23F'],
    [84, 56, '#3BCEAC'],
    [108, 52, '#5B8DEF'],
    [128, 62, '#FFFFFF'],
    [134, 84, '#FFD23F'],
    [122, 102, '#3BCEAC'],
    [80, 104, '#5B8DEF'],
    [66, 90, '#FFFFFF'],
  ];
  return (
    <g>
      <ellipse cx="100" cy="90" rx="54" ry="46" fill="#D9934E" />
      <ellipse cx="100" cy="84" rx="44" ry="36" fill={icing} />
      {sprinkles.map(([x, y, color]) => (
        <rect key={`${x}-${y}`} x={x - 4} y={y - 1.5} width="8" height="3" rx="1.5" fill={color} />
      ))}
      {/* hole in the middle */}
      <ellipse cx="100" cy="84" rx="14" ry="11" fill="#D9934E" />
    </g>
  );
}


function Brownie() {
  return (
    <g>
      <BrownieBlock x={36} y={72} />
      <BrownieBlock x={70} y={46} />
    </g>
  );
}

function BrownieBlock({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 22L70 22L90 6L20 6z" fill="#6E3D22" />
      <path d="M0 22h70v40H0z" fill="#4A2716" />
      <path d="M70 22l20-16v40l-20 16z" fill="#391D10" />
      <path d="M10 18q10-6 20 0t20 0 20-2" stroke="#F7EEDF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

export default DishArt;
