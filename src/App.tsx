import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Card = React.lazy(() => import("./components/Card"));
const Create = React.lazy(() => import("./components/Create"));
const Destinations = React.lazy(() => import("./components/Destinations"));
const Details = React.lazy(() => import("./components/Details"));
const NotFound = React.lazy(() => import("./components/NotFound"));
const ReactQueryDestinations = React.lazy(
  () => import("./components/ReactQueryDestinations")
);
const Search = React.lazy(() => import("./components/Search"));

function App() {
  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/pokemons/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Card />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/react-query" element={<ReactQueryDestinations />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
