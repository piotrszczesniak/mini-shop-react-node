import { ToastContainer } from 'react-toastify';
import Basket from './components/Basket';
import ProductsList from './components/ProductsList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';
import Payment from './components/Payment';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Payment />
      <hr />
      <h3>simple store</h3>
      <Basket />
      <ProductsList />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
