// localStorage-based authentication system

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const USERS_KEY = 'forexguru_users';
const CURRENT_USER_KEY = 'forexguru_current_user';

export function registerUser(name: string, email: string, phone: string, password: string): boolean {
  const users = getAllUsers();
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return false;
  }

  const newUser: User & { password: string } = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    password, // In real app, this would be hashed
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function loginUser(email: string, password: string): User | null {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && (u as any).password === password);

  if (user) {
    const currentUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    return currentUser;
  }

  return null;
}

export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function getAllUsers(): (User & { password: string })[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}
