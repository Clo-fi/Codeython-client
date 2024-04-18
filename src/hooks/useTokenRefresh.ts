import instance from '../api/axios';
// 토큰 만료 에러가 날 경우 이거 사용해서 토큰 재발급 받기 하려구요!
const useTokenRefresh = async (refreshToken: string) => {
  try {
    const response = await instance.post('/refresh', { refreshToken })
    const { accessToken } = response.data;
    return accessToken;
  } catch (err) {
    console.error(err);
  }
}

export default useTokenRefresh;