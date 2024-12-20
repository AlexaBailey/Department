import { createTheme } from '@mui/material/styles';
import { blue, pink, red } from '@mui/material/colors';

let theme = createTheme({
	palette: {
		primary: blue,
		secondary: pink,
		error: red,
	},
	typography: {
		fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
		h1: {
			fontSize: '36px',
			lineHeight: '38px',
			fontWeight: 600,
		},

		h2: {
			fontSize: '24px',
			lineHeight: '26px',
			fontWeight: 600,
		},
		h3: {
			fontSize: '18px',
			lineHeight: '27px',
			fontWeight: 600,
		},
		h4: {
			fontSize: '17px',
			lineHeight: '19px',
			fontWeight: 600,
		},
		h5: {
			fontSize: '15px',
			lineHeight: '17px',
			fontWeight: 600,
		},
		h6: {
			fontSize: '14px',
			lineHeight: '20px',
			fontWeight: 600,
		},
		subtitle1: {
			fontSize: '18px',
			lineHeight: '20px',
			fontWeight: 500,
		},
		subtitle2: {
			fontSize: '16px',
			lineHeight: '21px',
			fontWeight: 500,
		},
		body1: {
			fontSize: '16px',
			lineHeight: '21px',
			fontWeight: 400,
		},
		body2: {
			fontSize: '16px',
			lineHeight: '25px',
			fontWeight: 400,
		},
		caption: {
			fontSize: '14px',
			lineHeight: '16px',
			fontWeight: 400,
		},
		button: {
			fontSize: '14px',
			lineHeight: '21px',
			fontWeight: 500,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 'bold',
				},
			},
			variants: [
				{
					props: { variant: 'outlined' },
					style: {
						border: '1px solid rgba(0, 0, 0, .12)',
					},
				},
				{
					props: { variant: 'cancel' },
					style: {
						color: 'black',
						border: '1px solid rgba(0, 0, 0, .12)',
						'&:hover': {
							backgroundColor: '#f2f2f2',
						},
					},
				},
			],
		},
	},
});
export default theme;
