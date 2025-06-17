export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      saved_campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          ad_data: Json | null
          campaign_data: Json | null
          created_at: string
          updated_at: string
          type: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          ad_data?: Json | null
          campaign_data?: Json | null
          created_at?: string
          updated_at?: string
          type: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          ad_data?: Json | null
          campaign_data?: Json | null
          created_at?: string
          updated_at?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_campaigns_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}