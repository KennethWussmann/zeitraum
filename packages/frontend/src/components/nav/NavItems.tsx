import { As } from '@chakra-ui/react';
import { FiBarChart2, FiClock, FiCopy, FiTag } from 'react-icons/fi';
import { NavButton } from './NavButton';

type NavigationItem = {
  icon: As;
  label: string;
  onClick?: VoidFunction;
  href?: string;
};

export const navigationItems: NavigationItem[] = [
  {
    icon: FiBarChart2,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: FiClock,
    label: 'Time Spans',
    href: '/time-spans',
  },
  {
    icon: FiCopy,
    label: 'Presets',
    href: '/presets',
  },
  {
    icon: FiTag,
    label: 'Tags',
    href: '/tags',
  },
];

export const NavItems = () => (
  <>
    {navigationItems.map((item, index) => (
      <NavButton key={index} icon={item.icon} label={item.label} onClick={item.onClick} href={item.href} />
    ))}
  </>
);
