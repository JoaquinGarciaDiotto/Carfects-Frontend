import React from 'react';
import '../App.css';


function PageNotFound(props) {
  return (
    <section className='notFound'>
      <header className='notFound_head'>404 not found</header>
      <div className='notFound_body'>
        <picture className='notFound_body_image'>
          <img src="https://i.ibb.co/31kMnD4/Scarecrow.png" alt='Not Found' />
        </picture>
        <article className='notFound_body_details'>
          <div className='notFound_body_title'>Tengo malas noticias</div>
          <div className='notFound_body_description'>
            La pagina que estas buscando ha sido eliminada o no esta disponible temporalmente, presiona el boton de inicio para regresar.
          </div>
          <button
            className='notFound_body_button'
            onClick={() =>
              window.location.replace(
                '/'
              )
            }
          >
            volver a inicio
          </button>
        </article>
      </div>
    </section>
  );
}

PageNotFound.propTypes = {};

export default PageNotFound;