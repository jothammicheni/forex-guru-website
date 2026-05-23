// Shopping cart management
//lib/cart.ts
export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface CartItem {
  planId: string;
  plan: Plan;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

const CART_KEY = 'forexguru_cart';

export const PLANS: Plan[] = [
  {
    id: 'silver',
    name: 'Silver Plan',
    price: 47,
    duration: 'Lifetime',
    description: 'Perfect for beginners',
    features: [
      'Member dashboard access',
      '35+ In-depth videos',
      'Trading approach & strategies',
      'Live back testing videos',
      'Strategy playbook & checklist',
      'Private telegram access',
      'Pre-week market outlooks',
      'Trades video breakdowns',
      'Weekly/Monthly recaps',
      'Psychology sessions',
      'Frequent Q&A sessions',
      '24/5 Support',
    ],
  },
  {
    id: 'gold',
    name: 'Gold Plan',
    price: 127,
    duration: 'Lifetime',
    description: 'Best value for serious traders',
    features: [
      'All Silver benefits',
      'Extended quarterly access',
      'Member dashboard access',
      '35+ In-depth videos',
      'Trading approach & strategies',
      'Live back testing videos',
      'Strategy playbook & checklist',
      'Private telegram access',
      'Pre-week market outlooks',
      'Trades video breakdowns',
      'Weekly/Monthly recaps',
      'Psychology sessions',
      'Frequent Q&A sessions',
      '24/5 Support',
    ],
    popular: true,
  },
  {
    id: 'mentor',
    name: '1-on-1 Mentorship',
    price: 417,
    duration: 'Lifetime',
    description: 'Exclusive personalized coaching',
    features: [
      '1-on-1 mentorship',
      'All community benefits',
      'Tailored to your needs',
      'Private calls & coaching',
      'Private follow-ups',
      'All future webinars',
      'Member dashboard access',
      '35+ In-depth videos',
      'Trading approach & strategies',
      'Live back testing videos',
      'Strategy playbook & checklist',
      'Private telegram access',
      '24/5 Premium support',
    ],
  },
];

export function getCart(): Cart {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : { items: [], total: 0 };
}

export function addToCart(plan: Plan): void {
  const cart = getCart();
  const existingItem = cart.items.find(item => item.planId === plan.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      planId: plan.id,
      plan,
      quantity: 1,
    });
  }

  updateCartTotal(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function removeFromCart(planId: string): void {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.planId !== planId);
  updateCartTotal(cart);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function updateQuantity(planId: string, quantity: number): void {
  const cart = getCart();
  const item = cart.items.find(item => item.planId === planId);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(planId);
    } else {
      item.quantity = quantity;
      updateCartTotal(cart);
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }
}

export function clearCart(): void {
  localStorage.setItem(CART_KEY, JSON.stringify({ items: [], total: 0 }));
}

function updateCartTotal(cart: Cart): void {
  cart.total = cart.items.reduce((sum, item) => sum + item.plan.price * item.quantity, 0);
}

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find(plan => plan.id === id);
}
