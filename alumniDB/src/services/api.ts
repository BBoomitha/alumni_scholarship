// @ts-ignore
import { supabase } from '../supabaseClient.js';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabase && supabase.supabaseUrl && supabase.supabaseKey && supabase.supabaseKey !== 'your-anon-key-here';
};

// Helper function to handle API errors
const handleApiError = (error: any, operation: string) => {
  console.error(`Error in ${operation}:`, error);
  
  if (error.message?.includes('not configured')) {
    throw new Error('Supabase is not properly configured. Please check your environment variables.');
  }
  
  if (error.message?.includes('JWT')) {
    throw new Error('Invalid Supabase API key. Please check your VITE_SUPABASE_ANON_KEY.');
  }
  
  if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
    throw new Error('Database tables not found. Please run the database schema SQL first.');
  }
  
  throw new Error(`Database error in ${operation}: ${error.message || 'Unknown error'}`);
};

// Types for our database tables
export interface Alumni {
  id: number;
  name: string;
  year: string;
  dept: string;
  email: string;
  phone: string;
  whatsapp?: string;
  linkedin?: string;
  company?: string;
  role?: string;
  status: 'Active' | 'Inactive';
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

export interface Invitation {
  id: number;
  title: string;
  description: string;
  target_dept: string;
  attachment_url?: string;
  sent_at?: string;
  created_at?: string;
}

export interface ThankYouLetter {
  id: number;
  message: string;
  target_dept: string;
  attachment_url?: string;
  sent_at?: string;
  created_at?: string;
}

// Alumni API functions
export const alumniAPI = {
  // Get all alumni
  async getAll(): Promise<Alumni[]> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured. Please check your environment variables.');
    }
    
    try {
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      handleApiError(error, 'getAll alumni');
      return [];
    }
  },

  // Get alumni by ID
  async getById(id: number): Promise<Alumni | null> {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Search alumni
  async search(query: string): Promise<Alumni[]> {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,dept.ilike.%${query}%,year.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create new alumni
  async create(alumni: Omit<Alumni, 'id' | 'created_at' | 'updated_at'>): Promise<Alumni> {
    const { data, error } = await supabase
      .from('alumni')
      .insert([alumni])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update alumni
  async update(id: number, updates: Partial<Alumni>): Promise<Alumni> {
    const { data, error } = await supabase
      .from('alumni')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete alumni
  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('alumni')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Events API functions
export const eventsAPI = {
  // Get all events
  async getAll(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Get events by date range
  async getByDateRange(startDate: string, endDate: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Create new event
  async create(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update event
  async update(id: number, updates: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete event
  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Invitations API functions
export const invitationsAPI = {
  // Get all invitations
  async getAll(): Promise<Invitation[]> {
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create new invitation
  async create(invitation: Omit<Invitation, 'id' | 'created_at' | 'sent_at'>): Promise<Invitation> {
    const { data, error } = await supabase
      .from('invitations')
      .insert([{ ...invitation, sent_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Thank you letters API functions
export const thankYouLettersAPI = {
  // Get all thank you letters
  async getAll(): Promise<ThankYouLetter[]> {
    const { data, error } = await supabase
      .from('thank_you_letters')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create new thank you letter
  async create(letter: Omit<ThankYouLetter, 'id' | 'created_at' | 'sent_at'>): Promise<ThankYouLetter> {
    const { data, error } = await supabase
      .from('thank_you_letters')
      .insert([{ ...letter, sent_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Statistics API functions
export const statsAPI = {
  // Get alumni statistics
  async getAlumniStats(): Promise<{ total: number; active: number; inactive: number }> {
    const { data: totalData, error: totalError } = await supabase
      .from('alumni')
      .select('id', { count: 'exact' });
    
    if (totalError) throw totalError;

    const { data: activeData, error: activeError } = await supabase
      .from('alumni')
      .select('id', { count: 'exact' })
      .eq('status', 'Active');
    
    if (activeError) throw activeError;

    return {
      total: totalData?.length || 0,
      active: activeData?.length || 0,
      inactive: (totalData?.length || 0) - (activeData?.length || 0)
    };
  },

  // Get events statistics
  async getEventsStats(): Promise<{ total: number; thisMonth: number }> {
    const { data: totalData, error: totalError } = await supabase
      .from('events')
      .select('id', { count: 'exact' });
  
    if (totalError) throw totalError;
  
    const now = new Date();
    const currentMonthStart = now.toISOString().slice(0, 7) + "-01";
  
    // Get first day of next month
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonthStart = nextMonth.toISOString().slice(0, 10);
  
    const { data: monthData, error: monthError } = await supabase
      .from('events')
      .select('id', { count: 'exact' })
      .gte('date', currentMonthStart)
      .lt('date', nextMonthStart);
  
    if (monthError) throw monthError;
  
    return {
      total: totalData?.length || 0,
      thisMonth: monthData?.length || 0
    };
  }  
};
