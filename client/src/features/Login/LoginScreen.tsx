import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
    CssBaseline,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/AppRoutes';
import { useGetProfileQuery, useLoginMutation } from '../../services/auth/auth';
import { ILoginUser, UserRoles } from '../../services/auth/model';
import { useAppSelector } from '../../store/store';

const LoginScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const currentUser = useAppSelector((state) => state.userState.user);
    const { data: profile, isFetching } = useGetProfileQuery(undefined);

    const [login, { isLoading, isError }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            const bodyData: ILoginUser = {
                email: email,
                password: password,
            };

            await login(bodyData).unwrap();
        } catch (error) {}
    };

    React.useEffect(() => {
        if (!currentUser) {
            return;
        }

        if (currentUser.role === UserRoles.ADMIN) {
            navigate(AppRoutes.ADMIN_DASHBOARD);
        } else {
            navigate(AppRoutes.DASHBOARD);
        }
    }, [currentUser, profile]);

    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            {isFetching ? (
                <Box>Loading ...</Box>
            ) : (
                <>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#ec43ec',
                            filter: 'grayscale(80%)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component='h1' variant='h5'>
                                Sign in
                            </Typography>
                            <Box component='form' noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <LoadingButton
                                    loading={isLoading}
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogin();
                                    }}
                                >
                                    Sign In
                                </LoadingButton>

                                <Grid container>
                                    <Grid item>
                                        <RouteLink to='/register'>
                                            {"Don't have an account? Sign Up"}
                                        </RouteLink>
                                    </Grid>
                                </Grid>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    align='center'
                                >
                                    {'Copyright © '}
                                    <Link
                                        color='inherit'
                                        href='https://mui.com/'
                                    >
                                        Your Website
                                    </Link>{' '}
                                    {new Date().getFullYear()}
                                    {'.'}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default LoginScreen;
