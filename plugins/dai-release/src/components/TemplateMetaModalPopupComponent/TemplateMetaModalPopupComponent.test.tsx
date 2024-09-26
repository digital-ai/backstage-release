import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { TemplateMetaModalPopupComponent } from './TemplateMetaModalPopupComponent';

describe('TemplateMetaModalPopupComponent', () => {
  it('should renders button', async () => {
    const { getByLabelText } = render(<TemplateMetaModalPopupComponent />);
    const button = getByLabelText('more');
    expect(button).toBeInTheDocument();
  });
  it('should render pop over with No data available', async () => {
    const { getByLabelText, getByText } = render(
      <TemplateMetaModalPopupComponent />,
    );
    const button = getByLabelText('more');
    fireEvent.click(button);
    const popoverContent = getByText('No data available');
    expect(popoverContent).toBeInTheDocument();
  });
});
