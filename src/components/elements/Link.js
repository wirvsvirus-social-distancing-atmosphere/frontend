import { styled } from '@material-ui/core';

export const Link = styled('a')(({ theme }) => ({
  color: theme.palette.secondary.main,
  textDecoration: 'none',
}));
