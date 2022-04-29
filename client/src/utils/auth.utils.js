import api from '@/api';
const auth = api.auth();

export const login = async (formData) => {
  const data = await auth.login(formData);
  if(data.accessToken !== undefined){
    localStorage.setItem('ACCT', data.accessToken);
    localStorage.setItem('RFT', data.refreshToken);
  }
};
