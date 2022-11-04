import { api } from '../../api/api';
import { setUser } from '../../store/user/userSlice';
import { Device } from '../device/model';
import { IAuthTokenResponse, ILoginUser, IRegisterUser, IUser } from './model';

export const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        userDevices: builder.query<Device[], string>({
            query: (id) => ({
                url: `/users/${id}/devices`,
            }),
            // async onQueryStarted(_args, { dispatch, queryFulfilled }) {
            //     try {
            //         const { access_token } = (await queryFulfilled).data;
            //         window.localStorage.setItem('access_token', access_token);
            //         await dispatch(
            //             authSlice.endpoints.getProfile.initiate(undefined, {
            //                 forceRefetch: true,
            //             })
            //         );
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },
        }),
        // signup: builder.mutation<IAuthTokenResponse, IRegisterUser>({
        //     query: (body) => ({
        //         url: `auth/signup`,
        //         method: 'POST',
        //         body,
        //     }),
        //     async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        //         try {
        //             const { access_token } = (await queryFulfilled).data;
        //             window.localStorage.setItem('access_token', access_token);
        //             await dispatch(
        //                 authSlice.endpoints.getProfile.initiate(undefined, {
        //                     forceRefetch: true,
        //                 })
        //             );
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     },
        // }),
        // getProfile: builder.query<IUser, undefined>({
        //     query: () => ({
        //         url: 'auth/profile',
        //     }),
        //     async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled;
        //             dispatch(setUser(data));
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     },
        // }),
    }),
});

export const { useUserDevicesQuery } = userSlice;

// export const selectUsersResult = authSlice.endpoints.getUsers.select();