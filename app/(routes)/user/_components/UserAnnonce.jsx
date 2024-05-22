"use client"

import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Bath, BedDouble, MapPin, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function UserAnnonce() {
    const { user } = useUser();
    const [annonce, setAnnonce] = useState();

    useEffect(() => {
        user && GetUserAnnonce();
    }, [user]);

    const GetUserAnnonce = async () => {
        const { data, error } = await supabase
            .from('annonce')
            .select(`*,Annonce_images (annonce_id,url)`)
            .eq('cree_par', user?.primaryEmailAddress.emailAddress);
        setAnnonce(data);
    };

    return (
        <div>
            <h2 className='font-bold text-2xl'>Gérer mes annonces</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {annonce &&
                    annonce.map((item, index) => (
                        <div
                            key={index}
                            className='p-3 hover:border hover:border-primary cursor-pointer rounded-lg'
                            style={{ position: 'relative' }} // Ajoutez cette ligne pour définir la position relative
                        >
                            <div className='bg-primary rounded-lg text-white absolute px-2 text-sm p-1'>
                                {item.actif ? 'Publié' : 'Non publié'}
                            </div>
                            <Image
                                src={
                                    item?.Annonce_images[0]
                                        ? item?.Annonce_images[0]?.url
                                        : '/landscape-placeholder.svg'
                                }
                                width={800}
                                height={150}
                                className='rounded-lg object-cover h-[170px]'
                            />
                            <div className='flex mt-2 flex-col gap-2'>
                                <h2 className='font-bold text-xl'>{item.prix} MAD</h2>
                                <h2 className='flex gap-2 text-sm'>
                                    <MapPin className='h-4 w-4' />
                                    {item.address}
                                </h2>
                                <div className='flex gap-2 mt-2 justify-between'>
                                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full justify-center'>
                                        <BedDouble className='h-4 w-4' />
                                        {item?.chambre}
                                    </h2>
                                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full justify-center'>
                                        <Bath className='h-4 w-4' />
                                        {item?.salle_de_bain}
                                    </h2>
                                </div>
                                <div className='flex gap-2 justify-between'>
                                    <Link href={'/view-annonce/' + item.id}>
                                        <Button size='sm' variant='outline' className='w-full'>
                                            Voir
                                        </Button>
                                    </Link>
                                    <Link href={'/modifier-annonce/' + item.id} className='w-full'>
                                        <Button size='sm'>Modifier</Button>
                                    </Link>
                                    <Button size='sm' variant='destructive' className='w-full'>
                                        <Trash /> Supprimer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default UserAnnonce;