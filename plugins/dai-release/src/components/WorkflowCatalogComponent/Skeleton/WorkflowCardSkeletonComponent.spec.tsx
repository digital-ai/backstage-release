import React from 'react';
import { DotCard, DotSkeleton } from '@digital-ai/dot-components';
import {
  ReactWrapper,
  mockResizeObserver,
  mountWithTheme,
} from '../../../../../tests/unit/testing-utils';
import { WorkflowCardSkeleton } from './WorkflowCardSkeletonComponent';

describe('WorkflowCardSkeleton', () => {
  const mountComponent = () => mountWithTheme(<WorkflowCardSkeleton />);

  const getDotCard = (wrapper: ReactWrapper) => wrapper.find(DotCard);
  const getSkeletonWithClass = (wrapper: ReactWrapper, className: string) =>
    wrapper.findWhere(
      node => node.is(DotSkeleton) && node.props().className === className,
    );

  const getFooterButtonSkeleton = (wrapper: ReactWrapper) =>
    wrapper.findWhere(
      node =>
        node.is(DotSkeleton) &&
        node.props()['data-testid'] === 'footer-button-skeleton',
    );

  const getTitleSkeleton = (wrapper: ReactWrapper) =>
    wrapper.findWhere(
      node =>
        node.is(DotSkeleton) &&
        node.props()['data-testid'] === 'title-skeleton',
    );

  beforeEach(() => {
    mockResizeObserver();
  });

  it('should render properly', () => {
    const wrapper = mountComponent();

    const card = getDotCard(wrapper);
    expect(card).toExist();
    expect(card.props().className).toBe('workflow-card-skeleton-wrapper');

    const avatarSkeleton = getSkeletonWithClass(wrapper, 'avatar-skeleton');
    expect(avatarSkeleton).toExist();
    expect(avatarSkeleton.props().variant).toBe('circular');

    const titleSkeleton = getTitleSkeleton(wrapper);
    expect(titleSkeleton).toExist();
    expect(titleSkeleton.props().width).toBe('100%');
    expect(titleSkeleton.props().variant).toBeUndefined();

    const contentLineSkeletons = getSkeletonWithClass(
      wrapper,
      'card-content-line-skeleton',
    );
    expect(contentLineSkeletons).toExist();
    expect(contentLineSkeletons).toHaveLength(20);
    contentLineSkeletons.forEach(lineSkeleton =>
      expect(lineSkeleton.props().variant).toBe('rectangular'),
    );

    const footerButtonSkeleton = getFooterButtonSkeleton(wrapper);
    expect(footerButtonSkeleton).toExist();
    expect(footerButtonSkeleton.props().variant).toBe('rectangular');
  });
});
