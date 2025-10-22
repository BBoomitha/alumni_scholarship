import { supabase } from './supabaseClient.js';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  roll_number?: string;
  user_type?: string;
}

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

export const authService = {
  // Sign up a new user
  async signUp(email: string, password: string, userData: any): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            roll_number: userData.rollNumber,
            user_type: userData.userType
          }
        }
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Insert user data into appropriate table
        const tableName = userData.userType === 'student' ? 'students' : 'alumni';
        const userTableData = {
          name: userData.fullName,
          year: userData.yearOfPassing,
          dept: userData.department,
          email: userData.email,
          phone: userData.phone,
          whatsapp: userData.whatsapp || userData.phone,
          linkedin: userData.linkedin,
          company: userData.company,
          role: userData.role,
          status: 'Active',
          roll_number: userData.rollNumber,
          user_type: userData.userType
        };

        const { error: insertError } = await supabase
          .from(tableName)
          .insert([userTableData]);

        if (insertError) {
          console.error('Error inserting user data:', insertError);
          return { user: null, error: "Account created but failed to save profile data. Please contact support." };
        }

        return { 
          user: {
            id: data.user.id,
            email: data.user.email!,
            full_name: userData.fullName,
            roll_number: userData.rollNumber,
            user_type: userData.userType
          }, 
          error: null 
        };
      }

      return { user: null, error: "Failed to create account" };
    } catch (err) {
      console.error('Signup error:', err);
      return { user: null, error: "Signup failed. Please try again." };
    }
  },

  // Sign in an existing user
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        return { 
          user: {
            id: data.user.id,
            email: data.user.email!,
            full_name: data.user.user_metadata?.full_name,
            roll_number: data.user.user_metadata?.roll_number,
            user_type: data.user.user_metadata?.user_type
          }, 
          error: null 
        };
      }

      return { user: null, error: "Login failed" };
    } catch (err) {
      console.error('Login error:', err);
      return { user: null, error: "Login failed. Please try again." };
    }
  },

  // Sign out the current user
  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Signout error:', err);
    }
  },

  // Get the current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        return {
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name,
          roll_number: user.user_metadata?.roll_number,
          user_type: user.user_metadata?.user_type
        };
      }
      
      return null;
    } catch (err) {
      console.error('Get current user error:', err);
      return null;
    }
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }
};
