import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './pin.scss';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;


// import { Marker, Popup } from 'react-leaflet'
// import './pin.scss'
// import { Link } from 'react-router-dom'

// function Pin({item}){
//   return (
//     <Marker position={[item.latitude, item.longitude]}>
//         <Popup>
//             <div className="popupContainer">
//                 <img src={item.images[0]} alt="" />
//                 <div className="textContainer">
//                     <Link to={`/${item.id}`}>{item.title}</Link>
//                     <span>{item.bedroom} bedroom</span>
//                     <b>$ {item.price}</b>
//                 </div>
//             </div>
//         </Popup>
//     </Marker>
//   )
// }

// export default Pin