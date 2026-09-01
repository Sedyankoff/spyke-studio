import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-swift)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-red",
        outline:
          "border border-line bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        invert: "bg-paper text-ink hover:bg-red hover:text-paper",
        invertOutline:
          "border border-line-invert text-paper hover:border-paper hover:bg-paper hover:text-ink",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
