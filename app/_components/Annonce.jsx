"use client"

import { Bath, BedDouble, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import React , { useState } from 'react';
import GoogleAdresseRecherche from './GoogleAdresseRecherche';
import { Button } from '@/components/ui/button';
import FiltreSection from './FiltreSection';
import Link from 'next/link';


function Annonce({annonce, handleSearchClick, searchedAddress,
     setChambreCount, 
     setSalleDeBainCount,
    //setCategorie, 
    setOptionLocation,
    setCoordinates
}) {

    const [address,setAddress]= useState();
  return (
    <div>
        <div className='p-3 flex gap-6'>
            <GoogleAdresseRecherche 
            selectedAddress={(v)=>{searchedAddress(v);
                setAddress(v)}}
            setCoordinates={setCoordinates}
            />

            <Button className='flex gap-2'
            onClick={handleSearchClick}
            > <Search className='h-4 w-4'/> 
                Rechercher</Button>
        </div>
        <FiltreSection 
        setChambreCount={setChambreCount}
        setSalleDeBainCount={setSalleDeBainCount}
        //setCategorie={setCategorie}
        setOptionLocation={setOptionLocation}
        
        />
        {address&&<div className='px-3 my-5'>
            <h2 className='text-xl '> 
                Résultats <span className='font-bold'>{annonce?.length}</span> trouvés dans 
                <span className='text-primary font-bold'>{address?.label}</span>  
            </h2>
        </div>}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {annonce?.length>0? annonce.map((item, index)=>(
                <Link href={'/view-annonce/'+item.id}> 
                <div className='p-3 hover:border hover:border-primary cursor-pointer
                rounded-lg'>
                    <Image src={item.Annonce_images[0].url}
                    width={800}
                    height={150}
                    className='rounded-lg object-cover h-[170px]'
                    />
                
                        <div className='flex mt-2 flex-col gap-2'>
                            <h2 className='font-bold text-xl'>{item.prix} MAD</h2>
                            <h2 className='flex gap-2 text-sm'>
                                <MapPin className='h-4 w-4'/> 
                                {item.address}</h2>
                        <div className='flex gap-2 mt-2 justify-between'>
                            <h2 className='flex gap-2 text-sm bg-primary
                                        rounded-md p-2 w-full text-white justify-center'>
                                <BedDouble className='h-4 w-4'/>
                                {item?.chambre}
                            </h2>
                            <h2 className='flex gap-2 text-sm  bg-slate-200
                                        rounded-md p-2 w-full text-gray-700 justify-center'>
                                <Bath className='h-4 w-4'/>
                                {item?.salle_de_bain}
                            </h2>
                            
                        </div>
                    </div>
                </div>
                </Link>
            ))
        :[1,2,3,4,5,6,7,8,9,10].map((item, index)=>(
            <div key={index} className='h-[230px] w-full
              bg-slate-200 animate-pulse rounded-lg
            '>
            
            </div>
        ))
        }
        </div>

    </div>
  )
}

export default Annonce;