// Simple className utility (like clsx)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
