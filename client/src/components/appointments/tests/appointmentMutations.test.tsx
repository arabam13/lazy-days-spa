import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { mockUser } from '../../../mocks/mockData';
import { renderWithQueryClient } from '../../../test-utils';
import { Calendar } from '../Calendar';

// mocking useUser to mimic a logged-in user
jest.mock('../../user/hooks/useUser', () => ({
  __esModule: true,
  useUser: () => ({ user: mockUser }),
}));

test('Reserve appointment', async () => {
  await renderWithQueryClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>
  );

  // find all the appointments
  const appointments = await screen.findAllByRole('reserve');
  // console.log(appointments[0].tagName);
  // console.log(appointments[0].textContent);
  expect(appointments[0]).toHaveTextContent(
    /\d\d? [ap]m(scrum|facial|massage)/i
  );

  // click on the first one to reserve
  fireEvent.click(appointments[0]);

  // // check for the toast alert
  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('You have reserved the appointment!');

  // // close alert to keep state clean and wait for it to disappear
  const alertCloseButton = screen.getByRole('button', { name: 'Close' });
  alertCloseButton.click();
  await waitForElementToBeRemoved(alertToast);
});

test('Cancel appointment', async () => {
  renderWithQueryClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>
  );

  // find all the cancel buttons
  const cancelButtons = await screen.findAllByRole('button', {
    name: /cancel appointment/i,
  });
  // console.log(cancelButtons[0].tagName);

  // click on the first one to cancel
  fireEvent?.click(cancelButtons[0]);

  // check for the toast alert
  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('You have canceled the appointment!');

  // close alert to keep state clean and wait for it to disappear
  const alertCloseButton = screen.getByRole('button', { name: 'Close' });
  alertCloseButton.click();
  await waitForElementToBeRemoved(alertToast);
});
