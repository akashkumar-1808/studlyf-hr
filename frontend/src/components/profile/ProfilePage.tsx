"use client";

import React, { useEffect } from 'react';
import { useProfileStore } from '@/store/profileStore';
import ProfilePhotoCard from './ProfilePhotoCard';
import PersonalInformation from './PersonalInformation';
import CompanyInformation from './CompanyInformation';
import SecuritySection from './SecuritySection';
import AccountPreferences from './AccountPreferences';
import ActivitySection from './ActivitySection';
import SaveChangesBar from './SaveChangesBar';
import ProfileHeader from './ProfileHeader';

export default function ProfilePage() {
  const { profile, fetchProfile, isLoading } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading && !profile) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="relative min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <ProfileHeader />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR: Profile Card & Activity */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 shrink-0">
            <ProfilePhotoCard />
            <ActivitySection />
          </div>

          {/* RIGHT SIDE: Editable Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <PersonalInformation />
            <CompanyInformation />
            <AccountPreferences />
            <SecuritySection />
          </div>
        </div>

      </div>

      <SaveChangesBar />
    </div>
  );
}
