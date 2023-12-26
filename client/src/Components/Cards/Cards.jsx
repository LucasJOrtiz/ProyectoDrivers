import './Cards.css'
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

function Cards() {
  const allDrivers = useSelector((state) => state.allMyDrivers);

  return (
    <div className='cards'>
      {allDrivers.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
}

export default Cards

// function Cards() {

//   return (
//     <div className='cards'>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//       </div>
//   )
// }

// export default Cards
