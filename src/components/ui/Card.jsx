import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const Card = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      ref={ref}
      className={cn(
        'rounded-xl border border-slate-200 bg-white shadow-sleek',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
);

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
);
