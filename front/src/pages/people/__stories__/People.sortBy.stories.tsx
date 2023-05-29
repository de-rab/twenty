import { expect } from '@storybook/jest';
import type { Meta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import People from '../People';
import { Story } from './People.stories';
import { mocks, render } from './shared';

const meta: Meta<typeof People> = {
  title: 'Pages/People',
  component: People,
};

export default meta;

export const SortByEmail: Story = {
  render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const sortButton = canvas.getByText('Sort');
    await userEvent.click(sortButton);

    const emailSortButton = canvas.getByText('Email', { selector: 'li' });
    await userEvent.click(emailSortButton);

    expect(await canvas.getByTestId('remove-icon-email')).toBeInTheDocument();

    expect(await canvas.findByText('Alexandre Prot')).toBeInTheDocument();

    expect(
      (await canvas.findAllByRole('checkbox')).map((item) => {
        return item.getAttribute('id');
      })[1],
    ).toStrictEqual('person-selected-7dfbc3f7-6e5e-4128-957e-8d86808cdf6b');

    const cancelButton = canvas.getByText('Cancel');
    await userEvent.click(cancelButton);

    await expect(canvas.queryAllByTestId('remove-icon-email')).toStrictEqual(
      [],
    );
  },
  parameters: {
    msw: mocks,
  },
};
