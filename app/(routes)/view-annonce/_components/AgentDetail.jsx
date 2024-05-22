import { Button } from '@/components/ui/button'
import { Share } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function AgentDetail({annonceDetail}) {
  return (
    <div className='flex gap-5 items-center justify-between
    p-5 rounded-lg shadow-md border my-6'>
        <div className='flex items-center gap-6'>
            <Image src={annonceDetail?.photo_profil} 
            alt='photo_profil'
            width={60}
            height={60}
            className='rounded-full'
            />
            <div>
                <h2 className='text-lg font-bold'>{annonceDetail?.nom_utilisateur}</h2>
                <h2 className='text-gray-500'>{annonceDetail?.cree_par}</h2>
            </div>
        </div>
        <Button className='flex gap-2'> <Share/> Envoyer un message</Button>
    </div>
  )
}

export default AgentDetail