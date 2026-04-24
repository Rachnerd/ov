import { ElementRef } from '@angular/core';

/**
 * Set non-string props as JS properties on the underlying custom element.
 * String values are skipped — Angular's attribute binding handles those.
 */
export function applyProps(
  el: ElementRef<HTMLElement>,
  props: Record<string, unknown>,
): void {
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) {
      (el.nativeElement as unknown as Record<string, unknown>)[key] = value;
    }
  }
}

/** Attach a native DOM event listener and return a cleanup function. */
export function listen<T = CustomEvent>(
  el: ElementRef<HTMLElement>,
  event: string,
  handler: (e: T) => void,
): () => void {
  const fn = handler as EventListener;
  el.nativeElement.addEventListener(event, fn);
  return () => el.nativeElement.removeEventListener(event, fn);
}
