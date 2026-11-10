
function Svg({ size = 20, className, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export const SunIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);
export const MoonIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Svg>
);
export const CartIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6" />
  </Svg>
);
export const MenuIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);
export const CloseIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const SearchIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Svg>
);
export const PlusIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const MinusIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M5 12h14" />
  </Svg>
);
export const TrashIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v6M14 10v6" />
  </Svg>
);
export const ClockIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
export const FlameIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M12 22c4 0 7-2.7 7-6.5 0-3-1.8-5.2-3.5-7-.4 2-1.5 3-2.5 3.5C13.5 8 12 5 9 2c0 4-4 6.5-4 11.5C5 18.5 8 22 12 22z" />
  </Svg>
);
export const CheckIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);
export const PhoneIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  </Svg>
);
export const MailIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Svg>
);
export const MapPinIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);
export const ArrowRightIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const ArrowLeftIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const ReceiptIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </Svg>
);
export const ChefIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M7 18h10v3H7z" />
    <path d="M7 18v-4.5A4 4 0 0 1 6 6a4 4 0 0 1 6-3 4 4 0 0 1 6 3 4 4 0 0 1-1 7.5V18" />
  </Svg>
);
export const TruckIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Svg>
);
export const HomeIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </Svg>
);
export const LeafIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z" />
    <path d="M5 19l7-7" />
  </Svg>
);
export const HeartIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z" />
  </Svg>
);
export const BoltIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
  </Svg>
);
export const CashIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 9v.01M18 15v.01" />
  </Svg>
);
export const CardIcon = ({ size, className }) => (
  <Svg size={size} className={className}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </Svg>
);

