import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-[var(--ease-swift)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-red",
        outline:
          "border border-line bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        invert: "bg-paper text-ink hover:bg-red hover:text-paper",
        invertOutline:
          "border border-line-invert text-paper hover:border-paper hover:bg-paper hover:text-ink",
        /** The one red action on a surface. */
        primary:
          "bg-red-action text-white shadow-[0_14px_30px_-16px_rgb(217_6_22/0.85)] duration-300 hover:-translate-y-px hover:bg-red-deep hover:shadow-[0_20px_36px_-16px_rgb(179_15_24/0.9)]",
        /** Quiet companion to `primary` on dark imagery: an outline that only brightens. */
        ghost:
          "border border-paper/20 text-paper/85 duration-300 hover:border-paper/70 hover:text-paper",
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
