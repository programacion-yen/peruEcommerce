import { CalendarOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import { BlogFila } from '../../components/Blog/BlogFila';

const blog = {
  titulo: 'Titulo del blog',
  descripcion: 'Pequeña descripcion del blog.',
  fechaCreacion: new Date(),
  estructura: [
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: null,
          parrafo: 'Esta es la presentación al blog. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }
      ]
    },
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: null,
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        },
        {
          tipo: 'imagen',
          web: '/static/img/instagram/10.jpg',
          mobile: null
        },
        {
          tipo: 'texto',
          titulo: null,
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }
      ]
    },
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: null,
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }
      ]
    },
    {
      columnas: [
        {
          tipo: 'imagen',
          web: '/static/img/bg/about-us.jpg',
          mobile: null
        },
        {
          tipo: 'texto',
          titulo: 'Titulo de nueva seccion',
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }
      ]
    },
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: 'Titulo de nueva seccion',
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        },
        {
          tipo: 'imagen',
          web: '/static/img/bg/about-us.jpg',
          mobile: null
        },
      ]
    },
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: null,
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }
      ]
    },
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: 'Titulo de nueva seccion',
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        },
        {
          tipo: 'imagen',
          web: '/static/img/instagram/10.jpg',
          mobile: null
        }
      ]
    },
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: null,
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }
      ]
    }
  ]
}

const BlogDetailPage = () => {

  const router = useRouter();
  const { id } = router.query;

  console.log(id)

  const volverBlog = () => {
    router.push('/blog')
  }

  return (
    <div className='padding-global-home' style={{ maxWidth: '1200px', margin: '30px auto' }}>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      </div> */}
      <h2>{ blog.titulo }</h2>
      <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'end', fontSize: '16px' }}><CalendarOutlined style={{ marginRight: '5px' }}/>{ blog.fechaCreacion.toLocaleDateString() }</p>

      {
        blog.estructura.map( fila => (
          <BlogFila fila={fila} />
        ))
      }

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5%' }}>
        <button type='button' onClick={volverBlog} className='ps-btn'>Volver a todos los blog</button>
      </div>

    </div>
  )
}

export default BlogDetailPage