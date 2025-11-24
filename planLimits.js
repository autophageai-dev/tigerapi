// Map Stripe price IDs to monthly token limits
// Replace with your real Stripe price IDs
export const PLAN_LIMITS = {
  "price_free": 5000,
  "price_basic": 100000,
  "price_pro": 1000000,
  "price_enterprise": Infinity
};

export function getPlanLimit(planId) {
  return PLAN_LIMITS[planId] ?? 0;
}
