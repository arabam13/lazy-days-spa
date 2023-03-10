// import { act, renderHook, waitFor } from '@testing-library/react';

import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { createQueryClientWrapper } from '../../../test-utils';
import { useStaff } from '../hooks/useStaff';

test('filter staff', async () => {
  const { result } = renderHook(() => useStaff(), {
    wrapper: createQueryClientWrapper(),
  });

  // to get your bearings
  // console.log(result);

  // wait for the staff to populate
  await waitFor(() => result.current.staff.length === 4);

  // set to filter for only staff who give massage
  act(() => result.current.setFilter('massage'));

  // wait for the staff list to display only 3
  await waitFor(() => result.current.staff.length === 3);
});
