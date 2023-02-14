/* eslint-disable no-console */
import { screen } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../../mocks/server';
import { renderWithQueryClient } from '../../../test-utils';
import { Calendar } from '../Calendar';

test('Appointment query error', async () => {
  // (re)set handler to return a 500 error for appointments
  server.resetHandlers(
    rest.get('http://localhost:3030/appointments/:month/:year', (_, res, ctx) =>
      res(ctx.status(500))
    )
  );

  renderWithQueryClient(<Calendar />);

  // wait until there are two alerts, one from fetch and one from pre-fetch
  const alertToasts = await screen.findAllByRole('alert');
  // console.log(alertToasts[0].textContent);

  // expect(alertToasts).toHaveLength(0);
  expect(alertToasts).toHaveLength(1);
  alertToasts.map((toast) =>
    expect(toast).toHaveTextContent('Request failed with status code 500')
  );

  // expect(alertToasts).toHaveLength(2);
});
