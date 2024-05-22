"use client";

import React, { useEffect, useState } from 'react';
import Annonce from './Annonce';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import GoogleMapSection from './GoogleMapSection';


function AnnonceCarteVue({ categorie }) {

    const [annonce, setAnnonce] = useState([]);
    const [searchedAddress, setSearchedAddress] = useState();
    //const [categorie, setCategorie]= useState();
    const [chambreCount,setChambreCount]= useState(0);
    const [salledebainCount, setSalleDeBainCount] = useState(0);
    const [optionlocation, setOptionLocation] = useState();
    const [coordinates, setCoordinates] = useState();


    useEffect(() => {
        getLatestAnnonce();
    }, []);

    const getLatestAnnonce = async () => {
        console.log("Fetching annonces with  categorie :", categorie );

        const { data, error } = await supabase
            .from('annonce')
            .select(`*, Annonce_images (url, annonce_id)`)
            .eq('actif', true)
            .eq('categorie', categorie)
            .order('id', { ascending: false });

        if (data) {
            console.log("Fetched data:", data);
            setAnnonce(data);
        }

        if (error) {
            console.error('Error fetching data:', error);
            toast('Erreur côté serveur');
        }
    };

    const handleSearchClick = async () => {
        console.log(searchedAddress);
        const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;
        let query = supabase
            .from('annonce')
            .select(`*, Annonce_images (url, annonce_id)`)
            .eq('actif', true)
            .eq('categorie', categorie)
            .gte('chambre', chambreCount)
            .gte('salle_de_bain', salledebainCount)
            .like('address', '%' + searchTerm + '%')
            .order('id', { ascending: false });

            if(optionlocation)
                {
                    query=query.eq('option_location', optionlocation)
                }

           
            const { data, error } = await query;

        if (data) {
            console.log("Search results:", data);
            setAnnonce(data);
        }

        if (error) {
            console.error('Error during search:', error);
            toast('Erreur côté serveur');
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div>
                <Annonce annonce={annonce} 
                handleSearchClick={handleSearchClick}
                 searchedAddress={(v) => setSearchedAddress(v)} 
                setChambreCount={setChambreCount}
                setSalleDeBainCount={setSalleDeBainCount}
                setOptionLocation={setOptionLocation}
                setCoordinates={setCoordinates}
        
                 />
            </div>
            <div className='fixed right-10 h-full
            md:w-[350px] lg:w-[650px] xl:w-[650px]'>
                <GoogleMapSection
                annonce={annonce}
                coordinates={coordinates}
                
                />
            </div>
        </div>
    );
}

export default AnnonceCarteVue;
