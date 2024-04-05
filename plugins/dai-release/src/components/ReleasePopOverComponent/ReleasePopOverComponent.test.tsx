import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ReleasePopOverComponent } from './ReleasePopOverComponent';

describe('ReleasePopOverComponent', () => {
  it('should render pop over with No data available', async () => {
    const { getByLabelText, getByText } = render(<ReleasePopOverComponent />);
    const button = getByLabelText('more');
    fireEvent.click(button);
    const popoverContent = getByText('No data available');
    expect(popoverContent).toBeInTheDocument();
  });
});
