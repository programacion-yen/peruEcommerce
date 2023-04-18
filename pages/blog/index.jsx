import Link from "next/link";
import { useRouter } from "next/router";

import { Card } from 'antd';
import { CalendarOutlined } from "@ant-design/icons";
import { BlogFila } from "../../components/Blog/BlogFila";

const { Meta } = Card;

const estructura = {
  home: [
    {
      columnas: [
        {
          tipo: 'imagen',
          web: '/static/img/bg/about-us.jpg',
          mobile: null,
        }
      ]
    },
    {
      columnas: [
        {
          tipo: 'texto',
          titulo: 'Presentación al blog',
          parrafo: 'Esta es la presentación al blog. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
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
        },
        {
          tipo: 'texto',
          titulo: 'Titulo 2 de nueva seccion',
          parrafo: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
        }
      ]
    }
  ],
  blogs: [
    {
      id: '1',
      imagen: '/static/img/instagram/1.jpg',
      titulo: 'Titulo blog numero 1',
      fechaCreacion: new Date(),
      descripcion: 'Descripcion corta blog numero 1, este es el blog numero 1'
    },
    {
      id: '2',
      imagen: '/static/img/instagram/2.jpg',
      titulo: 'Titulo blog numero 2',
      fechaCreacion: new Date(),
      descripcion: 'Descripcion corta blog numero 2, este es el blog numero 2'
    },
    {
      id: '3',
      imagen: '/static/img/instagram/3.jpg',
      titulo: 'Titulo blog numero 3',
      fechaCreacion: new Date(),
      descripcion: 'Descripcion corta blog numero 3, este es el blog numero 3'
    },
    {
      id: '4',
      imagen: '/static/img/instagram/4.jpg',
      titulo: 'Titulo blog numero 4',
      fechaCreacion: new Date(),
      descripcion: 'Descripcion corta blog numero 4, este es el blog numero 4'
    },
    {
      id: '5',
      imagen: '/static/img/instagram/5.jpg',
      titulo: 'Titulo blog numero 5',
      fechaCreacion: new Date(),
      descripcion: 'Descripcion corta blog numero 5, este es el blog numero 5'
    }
  ]
}

const BlogPage = () => {

  const router = useRouter();

  const redirectBlog = (id) => {
    router.push(`/blog/${id}`)
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <div className="padding-global-home" style={{ maxWidth: '1200px', margin: 'auto', paddingTop: '3%', paddingBottom: '3%' }}>

        {
          estructura.home.map( (fila, i) => (
            <BlogFila fila={fila} key={i} />
          ))
        }

        <h3 style={{ margin: '4% 0', fontSize: '22px' }}>Última publicación</h3>
        <Link href='/blog/01'>
          <a>
            <div className="containerUltimoBlog">
              <img src={estructura.blogs[0].imagen} style={{ maxHeight: '250px', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '20px' }}>{ estructura.blogs[0].titulo }</h4>
                <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}><CalendarOutlined style={{ marginRight: '5px' }}/>{ estructura.blogs[0].fechaCreacion.toLocaleDateString() }</p>
                <p style={{ fontSize: '18px', textAlign: 'justify' }}>{ estructura.blogs[0].descripcion }</p>
              </div>
            </div>
          </a>
        </Link>

        <h3 style={{ margin: '4% 0', fontSize: '22px' }}>Ver todo</h3>

        {/* Blog entries */}
        <div style={{ display: 'flex', justifyContent: 'space-around', flexFlow:'wrap', gap: '5px' }}>

          {
            estructura.blogs.slice(1).map( blog => (
              <Card
                hoverable
                style={{ width: 270, marginBottom: '3%', marginRight: '2%' }}
                cover={<img alt="example" src={blog.imagen} />}
                key={ blog.titulo }
                onClick={() => redirectBlog(blog.id)}
              >
                <Meta 
                  title={blog.titulo} 
                  description={
                    <div>
                      <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}><CalendarOutlined style={{ marginRight: '5px' }}/>{ blog.fechaCreacion.toLocaleDateString() }</p>
                      <p style={{ margin: 0, textAlign: 'justify' }}>{ blog.descripcion }</p>
                    </div>
                  } 
                />
              </Card>
            ))
          }
          
        </div>

      </div>
    </div>
  )
}

export default BlogPage;