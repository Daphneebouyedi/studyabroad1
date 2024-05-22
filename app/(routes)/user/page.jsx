"use client";

import { UserButton, UserProfile } from '@clerk/nextjs';
import { Building2 } from 'lucide-react';
import React from 'react'
import UserAnnonce from './_components/UserAnnonce';

function User() {
  return (
    <div className='my-6 md:px-10 lg:px-32 w-full'>
      <h2 className='font-bold text-2xl py-3'> Profil</h2>
      <UserProfile routing="hash">
        <UserButton.UserProfilePage
        label='Mes Annonces'
        labelIcon={<Building2 className='h-5 w-5' />}
        url='mes-annonces'
        >
          <UserAnnonce />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
}

export default User;