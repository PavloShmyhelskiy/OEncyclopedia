import { useAuth } from '@api/resources/login/AuthContex'
import { getUserData, NetworkError, userData } from '@api/resources/login/login'
import { Input } from '@uikit/molecules'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { BaseModal, BaseModalProps } from '../components'

export interface LoginModalProps extends BaseModalProps {}

export interface Login {
  isAdmin: boolean;
  _id?: string;
  username: string; 
  email: string; 
  createdAt?: Date;
  updatedAt?: Date;
  __v?: string;
  accessToken: string;
}

const LoginModal = ({
  header,
  visible,
  onClose,
  onSuccess,
}: LoginModalProps ) => {
  const { control, handleSubmit } = useForm();
  const { setUser } = useAuth();
  
  const { data, mutate, isError, error } = useMutation(getUserData, { onSuccess: (data) => {
    
    localStorage.setItem("user", JSON.stringify(data))
    setUser && setUser(data as Login)
    onSuccess && onSuccess()
  } })

  const onSubmit = async (loginData: Object, e?: any) => {
    e?.preventDefault();
    
    mutate(loginData as userData);
      // const accessToken = await getUserData(loginData);

    console.log("accessToken:", data)
  }

  return (
    <BaseModal
      {...{
        visible,
        onClose,
        header: { ...header, withBorder: false },
      }}
    >
      <div className="p-5">
        <h3 className="text-center text-2xl font-bold text-ultra-dark-grey">
          Авторизація
        </h3>

        {isError && error instanceof NetworkError 
          ? <p className="mb-10 text-center text-xl text-red-600">{ error.message }</p> 
          : isError && <p className="mb-10 text-center text-xl text-red-600">{ "Неправильний пароль чи електронна пошта" }</p> }

        <form id="login-form" 
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="mt-[20px] text-xl">Електронна пошта</p>
          <Input
            name="email"
            type="email"
            required
            control={control}
            className="w-full overflow-hidden rounded-xsmall none"
            inputClassName="rounded-xsmall overflow-hidden my-3 py-1"
          />

          <p className="mt-[20px] text-xl">Пароль</p>
          <Input
            name="password"
            type="password"
            control={control}
            className="w-full overflow-hidden rounded-xsmall"
            inputClassName="rounded-xsmall overflow-hidden my-3 py-1"
          />

          <button className="w-full bg-slate-700 text-white py-4 mt-5" >
            Авторизуватися
          </button>
        </form>
      </div>
    </BaseModal>
  )
}

export default LoginModal
