// app/_components/Details.jsx

import GoogleMapSection from '@/app/_components/GoogleMapSection';
import { Button } from '@/components/ui/button';
import { Bath, Bed, Home, LandPlot, MapPin } from 'lucide-react';
import React, { useRef } from 'react';
import AgentDetail from './AgentDetail';

function Details({ annonceDetail }) {
  const bankDetailsRef = useRef(null);

  const handleReserveClick = () => {
    if (bankDetailsRef.current) {
      bankDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return annonceDetail && (
    <div className='my-6 flex gap-2 flex-col'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-bold text-3xl '>{annonceDetail?.prix} MAD</h2>
          <h2 className='text-gray-500 text-lg flex gap-2'>
            <MapPin />
            {annonceDetail?.address}
          </h2>
        </div>
        <Button className='flex gap-2' onClick={handleReserveClick}>Réserver</Button>
      </div>
      <hr />
      <div className='mt-4 flex flex-col gap-3'>
        <h2 className='font-bold text-2xl'>Informations :</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <h2 className='flex gap-2 items-center bg-slate-200 rounded-lg p-3 text-primary justify-center'>
            <Home />
            {annonceDetail?.categorie}
          </h2>
          <h2 className='flex gap-2 items-center justify-center bg-slate-200 rounded-lg p-3 text-primary'>
            <LandPlot />
            {annonceDetail?.surface} m²
          </h2>
          <h2 className='flex gap-2 items-center justify-center bg-slate-200 rounded-lg p-3 text-primary'>
            <Bed />
            {annonceDetail?.chambre} Chambre
          </h2>
          <h2 className='flex gap-2 items-center justify-center bg-slate-200 rounded-lg p-3 text-primary'>
            <Bath />
            {annonceDetail?.salle_de_bain} Salle de Bain
          </h2>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className='text-2xl font-bold '>Description :</h2>
        <p className='text-gray-600'>{annonceDetail?.description}</p>
      </div>
      <div>
        <h2 className='text-2xl font-bold '>Votre logement sur la Carte :</h2>
        <GoogleMapSection
          coordinates={annonceDetail?.coordinates}
          annonce={[annonceDetail]}
        />
      </div>
      <div>
        <h2 className='text-2xl font-bold '>Contacter l'hôte :</h2>
        <AgentDetail annonceDetail={annonceDetail} />
      </div>
      <div ref={bankDetailsRef}>
        <h2 className='text-2xl font-bold '>Détails Bancaires :</h2>
        <form className='max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-6'>
          <div className='mb-4'>
            <label className='block text-gray-700'>Nom</label>
            <input
              type='text'
              className='w-full mt-1 p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              className='w-full mt-1 p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Numéro de Carte Bancaire</label>
            <input
              type='text'
              className='w-full mt-1 p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Date d'Expiration</label>
            <input
              type='text'
              className='w-full mt-1 p-2 border border-gray-300 rounded-md'
              placeholder='MM/YY'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>CVV</label>
            <input
              type='text'
              className='w-full mt-1 p-2 border border-gray-300 rounded-md'
              required
            />
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'>
            Réserver
          </button>
        </form>
      </div>
    </div>
  );
}

export default Details;
