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

describe('ProductUpdate', () => {
  it('updates a product', async () => {
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

    const Product1 = await screen.findByText('Product 1');
    const row = Product1.closest('.MuiDataGrid-row')! as HTMLDivElement;
    const { getByLabelText: getByLabelTextInRow } = within(row);

    const moreButton = getByLabelTextInRow('more');
    await user.click(moreButton);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    const { getByRole: getByRoleInTooltip } = within(tooltip);
    //console.log('tooltip', prettyDOM(tooltip));

    const updateButton = getByRoleInTooltip('menuitem', {
      name: /Update/i,
    });
    await user.click(updateButton);

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
    await screen.findByRole('heading', {
      level: 2,
      name: /Update product/i,
    });
    const {
      getByLabelText: getByLabelTextInModal,
      getByRole: getByRoleInModal,
    } = within(modal);

    const nameInput = getByLabelTextInModal('Name');
    await user.clear(nameInput);
    await user.type(nameInput, 'Another name');

    const descriptionInput = getByLabelTextInModal('Description');
    await user.type(descriptionInput, 'Another description');

    const updateSubmitButton = getByRoleInModal('button', { name: 'Update' });
    await user.click(updateSubmitButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
    await waitFor(() => expect(nameInput).not.toBeInTheDocument());
    await waitFor(() => expect(descriptionInput).not.toBeInTheDocument());

    await screen.findByText('Successfully updated');
    expect(container).toMatchSnapshot();
    const _updatedProduct = await screen.findByText('Another name');
    /*const updatedRow = updatedProduct.closest(
      '.MuiDataGrid-row'
    )! as HTMLDivElement;
    expect(updatedRow).toBeInTheDocument();
    expect(updatedRow).toHaveTextContent('Another description');*/
    expect(Product1).toHaveTextContent('Another name');
    expect(row).toHaveTextContent('Another description');
  });
});
