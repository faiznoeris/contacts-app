import { ReactNode } from 'react';
import MUISkeleton from '@mui/material/Skeleton';
import type { SkeletonProps as MUISkeletonProps } from '@mui/material/Skeleton/Skeleton';

interface SkeletonProps {
    children: ReactNode;
    isLoading: boolean;
    skeletonProps: MUISkeletonProps;
}

const Skeleton = (props: SkeletonProps) => {
    const { children, isLoading, skeletonProps } = props;
    return isLoading ? <MUISkeleton {...skeletonProps} /> : children;
};

export default Skeleton;
