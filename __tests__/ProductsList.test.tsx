import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import { screen, waitFor /* fireEvent , act */ } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from 'components/pages/Products';

describe('ProductsList', () => {
  it('renders a list of products', async () => {
    const user = userEvent.setup();

    const { container, getByText: _getByText } = renderWithProviders(
      <Products />,
      {
        preloadedState: {
          common: {
            hydrate: {
              isHydratedToClient: true,
            },
          },
        },
      }
    );

    await waitFor(() => container.querySelector('.MuiCircularProgress-root'));
    await screen.findByText('Product 1');
    const inputFilterName = screen.getAllByLabelText('Name')[0];
    await user.type(inputFilterName, 'Product 5');
    const searchSubmitButton = screen.getByRole('button', { name: 'Search' });
    await user.click(searchSubmitButton);
    //fireEvent.change(inputFilterName, { target: { value: 'Product 5' } });
    //fireEvent.click(screen.getByText(/click me/i))
    /*await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });*/
  });
});
