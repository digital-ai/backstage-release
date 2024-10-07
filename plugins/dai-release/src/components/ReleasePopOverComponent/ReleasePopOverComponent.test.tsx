import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ReleasePopOverComponent } from './ReleasePopOverComponent';

describe('ReleasePopOverComponent', () => {
  it('should renders button', async () => {
    const { getByLabelText } = render(<ReleasePopOverComponent />);
    const button = getByLabelText('more');
    expect(button).toBeInTheDocument();
  });
  it('should render Meta Information button in popover', async () => {
    const { getByLabelText, getByText } = render(<ReleasePopOverComponent />);
    const button = getByLabelText('more');
    fireEvent.click(button);
    const metaInfoButton = getByText('Meta Information');
    expect(metaInfoButton).toBeInTheDocument();
  });

  it('should call onOpenPopupModal when Meta Information button is clicked', async () => {
    const setOpenModalMock = jest.fn();
    const setFolderIdMock = jest.fn();
    const setModalTitleMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <ReleasePopOverComponent
        folderId="testFolder"
        modalTitle="Test Modal"
        setOpenModal={setOpenModalMock}
        setFolderId={setFolderIdMock}
        setModalTitle={setModalTitleMock}
      />,
    );
    const button = getByLabelText('more');
    fireEvent.click(button);
    const metaInfoButton = getByText('Meta Information');
    fireEvent.click(metaInfoButton);
    expect(setOpenModalMock).toHaveBeenCalledWith(true);
    expect(setFolderIdMock).toHaveBeenCalledWith('testFolder');
    expect(setModalTitleMock).toHaveBeenCalledWith('Test Modal');
  });
});
