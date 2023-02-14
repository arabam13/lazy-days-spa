import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Fragment, ReactElement } from 'react';

import { queryClient } from '../../react-query/queryClient';
import { theme } from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { Routes } from './Routes';
import { createStandaloneToast } from '@chakra-ui/toast';

export function App(): ReactElement {
  return (
    <Fragment>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Loading />
          <Routes />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </Fragment>
  );
}
