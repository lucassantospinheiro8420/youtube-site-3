export async function trackEvent(variant: string, event: 'vsl_view' | 'button_visible' | 'button_click') {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant, event }),
    });
  } catch {
    // silently fail — never break the funnel
  }
}
