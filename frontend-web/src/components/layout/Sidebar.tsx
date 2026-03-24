"use client";

import Link from "next/link";
import { Shield, LayoutDashboard, UserCircle, Landmark, FileText, Users, KeyRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();
  const isAdmin = user?.roles.includes("ADMIN");
  const isUnderwriter = user?.roles.includes("UNDERWRITER");
  const isAdjuster = user?.roles.includes("CLAIMS_ADJUSTER");

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Shield size={18} />
        </div>
        <div>
          <h1>NorthStar</h1>
          <p>Insurance Platform</p>
        </div>
      </div>

      <nav className="nav-links">
        <Link href="/dashboard">
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <Link href="/profile">
          <UserCircle size={16} />
          Profile
        </Link>

        <Link href="/policies">
          <Landmark size={16} />
          Policies
        </Link>

        <Link href="/claims">
          <FileText size={16} />
          Claims
        </Link>

        <Link href="/amendments">
          <FileText size={16} />
          Amendments
        </Link>

        <Link href="/reductions">
          <FileText size={16} />
          Reductions
        </Link>

        {(isAdmin || isUnderwriter) && (
          <Link href="/amendments/review">
            <FileText size={16} />
            Amendment Review
          </Link>
        )}

        {(isAdmin || isUnderwriter) && (
          <Link href="/reductions/review">
            <FileText size={16} />
            Reduction Review
          </Link>
        )}

        {(isAdmin || isAdjuster) && (
          <Link href="/claims/review">
            <FileText size={16} />
            Claim Review
          </Link>
        )}

        {isAdmin && (
          <>
            <Link href="/admin/users">
              <Users size={16} />
              Admin Users
            </Link>
            <Link href="/admin/roles">
              <KeyRound size={16} />
              Roles
            </Link>
            <Link href="/admin/rbac">
              <KeyRound size={16} />
              RBAC
            </Link>
            <Link href="/admin/account-status">
              <Users size={16} />
              Account Status
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}