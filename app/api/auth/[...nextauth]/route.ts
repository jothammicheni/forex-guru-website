import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase/client';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('1. Authorize called with:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('2. Missing credentials');
          return null;
        }

        const clientId = process.env.CLIENT_ID || 'architect_catalogue_website_1';
        console.log('3. Client ID:', clientId);

        // Query user from Supabase - FIXED: Use .maybeSingle() instead of .single()
        console.log('4. Querying Supabase for user...');
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .eq('client_id', clientId)
          .maybeSingle(); // Changed from .single() to .maybeSingle()

        if (error) {
          console.log('5. Supabase error:', error.message);
          return null;
        }

        if (!user) {
          console.log('6. User not found');
          return null;
        }

        console.log('7. User found:', user.email, 'Role:', user.role);
        console.log('8. Password hash exists:', !!user.password_hash);

        // Verify password
        console.log('9. Comparing passwords...');
        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        console.log('10. Password valid:', isValid);
        
        if (!isValid) {
          console.log('11. Invalid password');
          return null;
        }

        console.log('12. Authentication successful!');
        
        // Update last login
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', user.id);

        return {
          id: user.id,
          email: user.email,
          name: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback:', { hasUser: !!user });
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback:', { hasToken: !!token });
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
    signOut: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
});

export { handler as GET, handler as POST };