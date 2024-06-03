// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Header from '../components/Header';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// // Mock logo import
// jest.mock('../images/Logo.png', () => 'logo.png');

// describe('Header Component', () => {
//   // const renderWithTheme = (ui, { themeOptions, ...options } = {}) => {
//   //   const theme = createTheme(themeOptions);
//   //   return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, { ...options });
//   // };

//   // test.skip('renders logo and My Feed link', () => {
//   //   render(
//   //       <Header />
//   //   );
//   //   expect(screen.getByAltText(/Buletin Logo/i)).toBeInTheDocument();
//   //   expect(screen.getByText(/My Feed/i)).toBeInTheDocument();
//   // });

//   // test('renders navigation items and icons on large screens', () => {
//   //   renderWithTheme(
//   //     <MemoryRouter>
//   //       <Header />
//   //     </MemoryRouter>
//   //   );
//   //   expect(screen.getByText(/Stories/i)).toBeInTheDocument();
//   //   expect(screen.getByText(/Creator/i)).toBeInTheDocument();
//   //   expect(screen.getByText(/Community/i)).toBeInTheDocument();
//   //   expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
//   //   expect(screen.getByRole('button', { name: /account of current user/i })).toBeInTheDocument();
//   // });

//   // test('does not render navigation items and icons on small screens', () => {
//   //   renderWithTheme(
//   //     <MemoryRouter>
//   //       <Header />
//   //     </MemoryRouter>,
//   //     {
//   //       themeOptions: {
//   //         breakpoints: {
//   //           values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
//   //         },
//   //       },
//   //       container: document.body.appendChild(document.createElement('div')),
//   //     }
//   //   );

//   //   window.innerWidth = 500;
//   //   window.dispatchEvent(new Event('resize'));

//   //   expect(screen.queryByText(/Stories/i)).not.toBeInTheDocument();
//   //   expect(screen.queryByText(/Creator/i)).not.toBeInTheDocument();
//   //   expect(screen.queryByText(/Community/i)).not.toBeInTheDocument();
//   //   expect(screen.queryByRole('button', { name: /Notifications/i })).not.toBeInTheDocument();
//   //   expect(screen.queryByRole('button', { name: /account of current user/i })).not.toBeInTheDocument();
//   // });

//   // test('opens and closes the account menu', () => {
//   //   renderWithTheme(
//   //     <MemoryRouter>
//   //       <Header />
//   //     </MemoryRouter>
//   //   );

//   //   const accountButton = screen.getByRole('button', { name: /account of current user/i });
//   //   fireEvent.click(accountButton);

//   //   expect(screen.getByText(/Profile/i)).toBeInTheDocument();
//   //   expect(screen.getByText(/My account/i)).toBeInTheDocument();

//   //   fireEvent.click(screen.getByText(/Profile/i));

//   //   expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
//   //   expect(screen.queryByText(/My account/i)).not.toBeInTheDocument();
//   // });
// });
