import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';

// Button Component
export interface IconProps {
  icon: ReactNode;
  className?: string;
}

export interface IconRefProps {
  iconRef: React.RefObject<SVGSVGElement>;
  className?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  icon?: ReactNode | React.RefObject<SVGSVGElement>;
  iconPosition?: 'left' | 'right';
}

export type ButtonIconProps = IconProps | IconRefProps;

// Input Component
export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Textarea Component
export interface TextareaProps 
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Badge Component
export interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof badgeVariants> {}

// Number Ticker Component
export interface NumberTickerProps 
  extends ComponentPropsWithoutRef<"span"> {
  value: number;
  duration?: number;
  className?: string;
}

// Sheet Component
export interface SheetContentProps {
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
}
