const initialState = {
  value: "",
  error: false,
  loading: false,
};

const reducer = (state, action) => {
  if (action.type === "ERROR") {
    return {
      ...state,
      error: true,
      loading: false,
    };
  }
};
//!reducer
import React, { useEffect, useReducer, Fragment } from "react";

const SECURITY_CODE = "paradigma";
const initialState = {
  value: "",
  loading: false,
  error: false,
  deleted: false,
  confirmed: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Error":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "Confirm":
      return {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
      };
    case "Write":
      return {
        ...state,
        value: action.payload,
      };
    case "Check":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "Delete":
      return {
        ...state,
        deleted: true,
      };
    case "Reset":
      return {
        ...state,
        value: "",
        confirmed: false,
        deleted: false,
      };
    default:
      return {
        ...state,
      };
  }
};

// const actionTypes = {
//   error: "ERROR",
//   confirm: "CONFIRM",
// };
// const onError = () => dispatch({ type: actionTypes.error });

// const onWrite = ({ target: { value } }) => {
//   dispatch({ type: actionTypes.write, payload: value });
// };

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          dispatch({ type: "Confirm" });
        } else {
          dispatch({ type: "Error" });
        }
      }, 1000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h3>Eliminar UseReducer</h3>
        <p>Por favor, escriba el código de seguridad.</p>
        {state.loading ? "Cargando..." : state.error ? "Error :(" : null}
        <br />
        <input
          type="text"
          placeholder="código de seguridad"
          value={state.value}
          onChange={(ev) =>
            dispatch({ type: "Write", payload: ev.target.value })
          }
        />
        <button
          onClick={() => {
            dispatch({ type: "Check" });
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <Fragment>
        <p>Pedimos confirmación. ¿Tas seguro?</p>
        <button onClick={() => dispatch({ type: "Delete" })}>
          Si, eliminar
        </button>
        <button onClick={() => dispatch({ type: "Reset" })}>
          No, me arrepentí
        </button>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <p>Eliminado con éxito</p>
        <button onClick={() => dispatch({ type: "Reset" })}>Regresar</button>
      </Fragment>
    );
  }
}
// reducer localStorage

import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState({ initialValue })
  );

  const { sincronizedItem, loading, error, item } = state;

  // Action creators
  const onError = (error) =>
    dispatch({ type: actionTypes.error, payload: error });
  const onSuccess = (parsedItem) =>
    dispatch({ type: actionTypes.success, payload: parsedItem });
  const onSave = (newItem) =>
    dispatch({ type: actionTypes.save, payload: newItem });
  const onSincronize = () => dispatch({ type: actionTypes.sincronize });

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }
        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 3000);
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  };

  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  loading: true,
  error: false,
  item: initialValue,
});

const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
  sincronize: "SINCRONIZE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    sincronizedItem: true,
    loading: false,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };

//!Navigation
// Importamos el componente de una vez
//!rutas dinamicas
import { BlogPost } from './Components/Routes/BlogPost/BlogPost';

function App() {
  return (
    <>
      <HashRouter>
        ...
        <Routes>
          ...
           <Route path='/blog' element={<BlogPage />} />
					{/* En este caso la ruta dinámica se almacena en "slug" */}
          <Route path='/blog/:slug' element={<BlogPost />} />
        </Routes>
      </HashRouter>
    </>
  )


//*
  import React from 'react';

// Importamos el useParams
import { Link, useParams } from 'react-router-dom';
// También necesitamos los datos aquí
import { blogdata } from '../Data/blogdata'

function BlogPost() {
  /* Para cargar la información dinámicamente en la página debemos 
  hacer uso del "useParams", este por medio de un objeto que debemos 
  destructurar nos traerá el slug */
  const { slug } = useParams();

  /* Lo que hacemos por acá es encontrar la información que 
  necesitamos mediante una confición en un fin que nos envíe y 
  guarde en esta variable los datos del post cuyo slug coincida con 
  el que estamos solicitando por un compoente para que se renderice */
  const blogpost = blogdata.find( post => post.slug == slug );

  /* Ahora si, después de que encontremos la información que 
  necesitamos podemos cargarla en nuestro componente y renderizarla */
  return (
    <>
      <h3>{blogpost.title}</h3>
      <p>{blogpost.author}</p>
      <p>{blogpost.content}</p>
    </>
  );
}

  export { BlogPost }
//*
import React from 'react';
import { Link } from 'react-router-dom';
import { blogdata } from '../Data/blogdata'

/* Como en nuestro anterior componente, aquí cargarémos la 
información de manera dinámica por medio de un arreglo, para que 
nuestro código sea más mantenible a futuro y evitar duplicidad y 
crear verdaderos componentes */
function BlogPage() {
  return (
    <>
      <h2>Blog Page</h2>

      <ul>
        {blogdata.map( post => (
          <BlogLink post={post} />
        ))}
      </ul>
    </>
  );
}

/* Este BlogLink srá el que contenga los datos que nos crearan 
nuestro slug y nos redireccionen al contenido que deseamos ver */
function BlogLink({ post }) {
  return (
    <li>
      <Link
        to={`/blog/${post.slug}`}
      >{post.title}</Link>
    </li>
  );
}

  export { BlogPage }

//*  array
/* Este Array simula una API que contenga nuestros datos, estos 
cargarán dinámicamente el contenido a los fake blogs */ 
const blogdata = [];

blogdata.push({
  title: '¿Que es React?',
  slug: 'que-es-react',
  content: 'React es el mejor Framework de JavaScript, que lindo React',
  author: 'Andrés Rodríguez'
});

blogdata.push({
  title: '¿Que es Vue?',
  slug: 'que-es-vue',
  content: 'Vue es el mejor Framework de JavaScript, que lindo Vue',
  author: 'Andrés Rodríguez'
});

blogdata.push({
  title: '¿Que es Angular?',
  slug: 'que-es-angular',
  content: 'Angular esta bien, que lindo React XD',
  author: 'Andrés Rodríguez'
});

blogdata.push({
  title: '¿Que es Svelte?',
  slug: 'que-es-svelte',
  content: 'Svelte es el mejor Framework de JavaScript, que lindo Svelte',
  author: 'Andrés Rodríguez'
});

//!menu
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <ul>
        {routes.map(route => (
          <li key={route.to}>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'blue',
              })}
              to={route.to}
            >
              {route.text}
            </NavLink>
          </li>
        ))}
        
        {/* <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li> */}

        {/* <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'blue',
            })}
            to="/"
          >Home</NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'blue',
            })}
            to="/blog"
          >Blog</NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? 'red' : 'blue',
            })}
            to="/profile"
          >Profile</NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

const routes = [];
routes.push({
  to: '/',
  text: 'Home',
});
routes.push({
  to: '/blog',
  text: 'Blog',
});
routes.push({
  to: '/profile',
  text: 'Profile',
});

  export { Menu };

//*Outlet: nested routes
   //*Importar Outlet renderiza el componente hijo en la vista padre
    
//*useAuth: login y logout
import React,{useContext}from 'react';import{useNavigate}from 'react-router-dom';const AuthContext=React.createContext();function AuthProvider({children}){const navigate=useNavigate();const[user,setUser]=React.useState(null);const login=({username})=>{setUser({username});navigate('/profile');};const logout=()=>{setUser(null);navigate('/');};const auth={user,login,logout};return(<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>);}
function useAuth(){const auth=React.useContext(AuthContext);return auth;}
  export { AuthProvider, useAuth, };

    
//!Menu rutas privadas
    import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './auth';

function Menu() {
  const auth = useAuth();
  
  return (
    <nav>
      <ul>
        {routes.map(route => {
          if (route.publicOnly && auth.user) return null;
          if (route.private && !auth.user) return null;
          
          return (
            <li key={route.to}>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'blue',
                })}
                to={route.to}
              >
                {route.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const routes = [];
routes.push({
  to: '/',
  text: 'Home',
  private: false,
});
routes.push({
  to: '/blog',
  text: 'Blog',
  private: false,
});
routes.push({
  to: '/profile',
  text: 'Profile',
  private: true,
});
routes.push({
  to: '/login',
  text: 'Login',
  private: false,
  publicOnly: true,
});
routes.push({
  to: '/logout',
  text: 'Logout',
  private: true,
});

  export { Menu };

//*Auth ruta protegidas
    import { HashRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './Menu';
import { AuthProvider, AuthRoute } from './auth'
import { HomePage } from './HomePage';
import { BlogPage } from './BlogPage';
import { BlogPost } from './BlogPost';
import { ProfilePage } from './ProfilePage';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';

// /#/ -> Home
// /#/blog
// /#/profile
// /#/lalalala -> Not Found
// /blog, /lalala -> Home

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />

          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/blog" element={<BlogPage />}>
              <Route path=":slug" element={<BlogPost />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/logout"
              element={
                <AuthRoute>
                  <LogoutPage />
                </AuthRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthRoute>
                  <ProfilePage />
                </AuthRoute>
              }
            />

            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;