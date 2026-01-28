import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Supabase auth state listener
    useEffect(() => {
        setIsLoading(true);
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.user_metadata?.full_name,
                    avatar_url: session.user.user_metadata?.avatar_url,
                });
            }
            setIsLoading(false);
        };
        getSession();
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.user_metadata?.full_name,
                    avatar_url: session.user.user_metadata?.avatar_url,
                });
            }
            else {
                setUser(null);
            }
        });
        return () => {
            subscription?.unsubscribe();
        };
    }, []);
    const signInWithGoogle = useCallback(async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/#/`,
            },
        });
        if (error) {
            throw new Error(error.message);
        }
    }, []);
    const signUp = useCallback(async (email, password) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            throw new Error(error.message);
        }
    }, []);
    const signIn = useCallback(async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw new Error(error.message);
        }
    }, []);
    const logout = useCallback(async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw new Error(error.message);
        }
    }, []);
    const value = {
        user,
        isLoading,
        signInWithGoogle,
        signUp,
        signIn,
        logout,
        isAuthenticated: !!user,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
