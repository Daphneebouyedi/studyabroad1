import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useState } from 'react'
import MarkerAnnonceItem from './MarkerAnnonceItem';

function MarkerItem({item}) {
    const  [selectedAnnonce, setselectedAnnonce]= useState();

  return (
    <div>
        <MarkerF
            position={item.coordinates}
            onClick={()=>setselectedAnnonce(item)}
            icon={{
                url:'/pin.png',
                scaledSize:{
                    width:70,
                    height:60
                }
            }}
        >


            { selectedAnnonce&& <OverlayView 
                position={selectedAnnonce.coordinates}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div>
                    <MarkerAnnonceItem
                    closeHandler={()=>setselectedAnnonce(null)}
                    item={selectedAnnonce} />
                </div>

            </OverlayView> }
        </MarkerF>
    </div>
  )
}

export default MarkerItem