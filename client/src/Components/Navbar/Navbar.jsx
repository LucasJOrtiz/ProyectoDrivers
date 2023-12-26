import './Navbar.css'

function Navbar() {

  return (
      <div className='container'>
        <form>
          <input type="text" className='navbar' placeholder='Ingresa un Nombre'/>
          <button className='button'>Buscar</button>
        </form>
      </div>
  )
}

export default Navbar
