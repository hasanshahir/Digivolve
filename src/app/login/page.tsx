"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ShieldAlert, AlertCircle, ArrowLeft } from "lucide-react";

const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<"client" | "admin">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        if (session.user.email === "hasanshahirconnect@gmail.com") {
          router.push("/admin");
        } else {
          router.push("/account");
        }
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/account`,
        },
      });
      if (error) throw new Error(error.message);
    } catch (err: any) {
      setErrorMsg(err.message || "OAuth failed. Check your Supabase configuration.");
      setLoading(false);
    }
  };

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (email !== "hasanshahirconnect@gmail.com") {
      setErrorMsg("Unauthorized: This login form is restricted to administrators.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user?.email === "hasanshahirconnect@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to sign in. Verify your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-12 transition-colors duration-300">
      
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-bold text-sm text-text-muted hover:text-text mb-8 hover:underline decoration-accent-coral underline-offset-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="w-full max-w-md">
        
        {/* Logo Mark */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="brutalist-badge-coral w-10 h-10 flex items-center justify-center font-display font-bold text-xl text-white">
              H
            </span>
            <span className="font-display font-bold text-2xl tracking-tight text-text">
              HKH<span className="text-accent-coral">.</span>
            </span>
          </Link>
          <p className="text-text-muted text-xs mt-2 uppercase tracking-widest font-bold">
            Secure Client & Admin Portal
          </p>
        </div>

        {/* Tab selector */}
        <div className="grid grid-cols-2 border-2 border-border bg-surface rounded-t-xl overflow-hidden">
          <button
            onClick={() => {
              setActiveTab("client");
              setErrorMsg("");
            }}
            className={`py-3 font-display font-bold text-xs uppercase border-r-2 border-border cursor-pointer transition-colors ${
              activeTab === "client" ? "bg-accent-sky text-text" : "bg-surface text-text-muted hover:text-text"
            }`}
          >
            Client Login
          </button>
          <button
            onClick={() => {
              setActiveTab("admin");
              setErrorMsg("");
            }}
            className={`py-3 font-display font-bold text-xs uppercase cursor-pointer transition-colors ${
              activeTab === "admin" ? "bg-accent-coral text-white" : "bg-surface text-text-muted hover:text-text"
            }`}
          >
            Admin Access
          </button>
        </div>

        {/* Form Card */}
        <div className="brutalist-card bg-surface p-8 rounded-t-none rounded-b-xl border-t-0">
          
          {errorMsg && (
            <div className="p-4 mb-6 border-2 border-border bg-red-100 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-xl flex items-start gap-3 text-xs">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="font-medium">{errorMsg}</p>
            </div>
          )}

          {activeTab === "client" ? (
            /* CLIENT OAUTH LOGIN */
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="font-display font-bold text-xl text-text">
                  Sign In to Client Portal
                </h2>
                <p className="text-text-muted text-xs leading-relaxed">
                  Access your brand campaigns, design assets, and direct review channels.
                </p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="brutalist-btn brutalist-btn-secondary w-full py-3.5 flex items-center justify-center gap-3 text-sm select-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-border border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <GoogleIcon />
                    <span className="font-bold">Continue with Google</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-[10px] text-text-muted leading-relaxed">
                By signing in, you agree to our Terms of Service. Note: OAuth requires configuration in the Supabase Dashboard.
              </div>
            </div>
          ) : (
            /* ADMIN EMAIL/PASSWORD LOGIN */
            <form onSubmit={handleAdminSignIn} className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="font-display font-bold text-xl text-text">
                  Admin Dashboard Log In
                </h2>
                <p className="text-text-muted text-xs leading-relaxed">
                  Restricted to authorized personnel. Session activities are monitored.
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="admin-email" className="block text-[10px] font-bold text-text uppercase tracking-wider">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hasanshahirconnect@gmail.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-border bg-bg text-text rounded-xl focus:outline-none focus:border-accent-coral transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label htmlFor="admin-password" className="block text-[10px] font-bold text-text uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border-2 border-border bg-bg text-text rounded-xl focus:outline-none focus:border-accent-coral transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="brutalist-btn brutalist-btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm select-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span className="font-bold">Authenticate Admin</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </main>
  );
}
