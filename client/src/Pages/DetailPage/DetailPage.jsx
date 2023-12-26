// import './DetailPage.css'

// function DetailPage() {

//   return (
//       <div>
//         <h1>Detalles del Piloto</h1>
//       </div>
//   )
// }

// export default DetailPage

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DetailPage() {
  const { id } = useParams();
  const allDrivers = useSelector((state) => state.allMyDrivers);
  const driver = allDrivers.find((d) => d.id === parseInt(id));

  if (!driver) {
    return <div>Conductor no encontrado</div>;
  }

  return (
    <div>
      <h1>Detalles del Piloto - {driver.name}</h1>
      <p>ID: {driver.id}</p>
      <p>Nombre: {driver.name}</p>
      {/* Mostrar el resto de la información del conductor aquí */}
    </div>
  );
}

export default DetailPage;