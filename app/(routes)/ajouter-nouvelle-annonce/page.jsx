"use client"

import GoogleAdresseRecherche from '@/app/_components/GoogleAdresseRecherche';
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';


function AjouterNouvelleAnnonce() {
  const [selectedAddress,setselectedAddress] = useState();
  const [coordinates,setCoordinates] = useState();
  const {user}=useUser();
  const [loader, setLoader] = useState(false);
  const router=useRouter();
  const nextHandler = async()=>{
    setLoader(true);
    console.log(selectedAddress, coordinates);

        const { data, error } = await supabase
        .from('annonce')
        .insert([
          { address: selectedAddress.label, 
            coordinates: coordinates,
            cree_par:user?.primaryEmailAddress.emailAddress 
            
          },
        ])
        .select();

        if(data)
          {
            setLoader(false);
            console.log("Nouvelle donnée ajoutée,", data);
            toast("Nouvelle donnée ajoutée");
            router.replace('/modifier-annonce/'+data[0].id);
          }
        if(error)
          {
            setLoader(false)
            console.log("Erreur", erreur);
            toast("Erreur côté serveur")
          }
            
  };

  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 flex flex-col 
      gap-5 items-center justify-center'>
        <h2 className='font-bold text-2xl'>Ajouter une nouvelle annonce</h2>
        <div className='p-10 rounded-lg border 
        w-full
        shadow-md flex flex-col gap-5'>
          <h2 className='text-gray-500'>Entrez l'adresse que vous souhaitez ajouter  </h2>
        <GoogleAdresseRecherche 
          selectedAddress={(value)=>setselectedAddress(value)}
          setCoordinates={(value)=>setCoordinates(value)}
        />
        <Button
        disabled={!selectedAddress|| !coordinates || loader}
          onClick={nextHandler}
        >
        {loader? <Loader className='animate-spin'/>:'Suivant'}
        </Button>
        </div>
      </div>
    </div>
  )
}

export default AjouterNouvelleAnnonce;