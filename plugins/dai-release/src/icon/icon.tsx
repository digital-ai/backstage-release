import React from 'react';
import { createSvgIcon } from '@mui/material/utils';
import '@digital-ai/dot-icons/index.css';

export const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  'Plus',
);

export const templateIcon = () => {
  return <div>
    <span className="dot-icon">
    <i className="icon-template"></i>
    </span>
  </div>
}

export const activeReleaseIcon = () => {
  return <div>
    <span className="dot-icon">
    <i className="icon-release"></i>
    </span>
  </div>
}

export const workflowIcon = () => {
  return <div>
    <span className="dot-icon">
    <i className="icon-workflow"></i>
    </span>
  </div>
}

