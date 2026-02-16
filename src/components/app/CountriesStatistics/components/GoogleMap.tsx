'use client';

import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps';

import { CONSTANTS } from '@/datasets/constants';
import { StatisticsMapper } from '@/types';

type Props = {
    statistics: StatisticsMapper['countries']
};

export default function GoogleMap(props: Props) {
    return (
        <APIProvider
            apiKey={ CONSTANTS.GOOGLE_MAPS_KEY }
            region={ CONSTANTS.LOCALE.region }
            language={ CONSTANTS.LOCALE.code }
        >
            <Map
                className="c-countries-statistics__map-inner"
                defaultCenter={ { lat: 20, lng: 2 } }
                defaultZoom={ 1 }
                mapId="map-id"
                gestureHandling="greedy"
                clickableIcons={ false }
                disableDefaultUI
            >
                {
                    props.statistics.map(
                        (item, i) => (
                            <AdvancedMarker
                                key={ i }
                                position={ { lat: item.lat, lng: item.lng } }
                            >
                                <div className="c-countries-statistics__map-marker" />
                            </AdvancedMarker>
                        )
                    )
                }
            </Map>
        </APIProvider>
    );
}