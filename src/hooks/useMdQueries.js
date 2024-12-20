import { useMediaQuery } from '@mui/material';

export const useMdQueries = () => {
	const isMobileList = useMediaQuery('(max-width:600px)');
	const isMobile = useMediaQuery('(max-width: 700px)');
	const isTablet = useMediaQuery('(min-width: 700px) and (max-width: 1023px)');
	const isDesktop = useMediaQuery('(min-width: 1024px)');
	return { isMobileList, isMobile, isTablet, isDesktop };
};
