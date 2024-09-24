import '@testing-library/jest-dom';
import { renderWithProviders } from 'tests';
import React from 'react';
import {
  screen,
  within,
  //prettyDOM,
  waitFor /* fireEvent , act */,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Products } from 'components/pages/Products';
import { Content } from 'components/layout/Content';

describe('ProductView', () => {
  it('views a product', async () => {
    const user = userEvent.setup();

    const { container } = renderWithProviders(
      <Content>
        <Products />
      </Content>,
      {
        preloadedState: {
          common: {
            hydrate: {
              isHydratedToClient: true,
            },
          },
          products: {
            productsPermissions: {
              canUpdateProduct: true,
            },
          },
        },
      }
    );

    expect(container).toMatchSnapshot();

    const Product1 = await screen.findByText('Product 1');
    const row = Product1.closest('.MuiDataGrid-row')! as HTMLDivElement;
    const { getByLabelText: getByLabelTextInRow } = within(row);

    const moreButton = getByLabelTextInRow('more');
    await user.click(moreButton);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    const { getByRole: getByRoleInTooltip } = within(tooltip);
    //console.log('tooltip', prettyDOM(tooltip));

    const viewButton = getByRoleInTooltip('menuitem', {
      name: /View/i,
    });
    await user.click(viewButton);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    await screen.findByRole('heading', {
      level: 2,
      name: /View product/i,
    });
    const { getByText: getByTextInModal, getByRole: getByRoleInModal } =
      within(modal);

    const Product1InModal = getByTextInModal('Product 1');
    const closeButton = getByRoleInModal('button', { name: 'Close' });
    await user.click(closeButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
    await waitFor(() => expect(Product1InModal).not.toBeInTheDocument());
  });
});
