// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

import App from "./App";
import FormCreateSignUp from "./components/FormSignUp/FormCreateSignUp";
import Swiper from "./components/Swiper/Swiper";
import Catalog from "./pages/Catalog/Catalog";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Provider from "./pages/Provider/Provider";
import Stay from "./pages/Stay/Stay";
import VersusPage from "./pages/VersusPage/VersusPage";
import { chrLoader } from "./services/Loader/LoaderChr";
// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/provider/:id",
        element: <Provider />,
        loader: async ({ params }) => {
          const { id } = params;
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/chr/${id}`,
            );
            if (!response.ok) {
              throw new Error("Erreur de récupération des données");
            }
            const data = await response.json();
            return data[0];
          } catch (error) {
            throw new Error("Erreur de chargement des données");
          }
        },
      },
      {
        path: "/stay",
        element: <Stay />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/search",
        element: <Swiper />,
        loader: chrLoader,
      },
      {
        path: "/settings",
        element: <VersusPage />,
      },
      {
        path: "/form-create-sign-up",
        element: <FormCreateSignUp />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
