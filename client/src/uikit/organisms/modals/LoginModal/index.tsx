import { useAuth } from '@api/resources/login/AuthContex'
import { getUserData, NetworkError, userData } from '@api/resources/login/login'
import { Input } from '@uikit/molecules'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useModals } from '..'
import { BaseModal, BaseModalProps } from '../components'

export interface LoginModalProps extends BaseModalProps {
  emailValue?: string
}

export interface FullUserData {
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
  emailValue,
}: LoginModalProps ) => {
  const { control, handleSubmit, setValue } = useForm();
  const { setUser } = useAuth();
  const { setModal } = useModals();
  // const router = useRouter();

  setValue("email", emailValue)
  
  const { data, mutate, isError, error, isLoading } = useMutation(getUserData, { onSuccess: (data) => {

    // if (data?.isAdmin) router.push("http://localhost:5521");

    localStorage.setItem("user", JSON.stringify(data))
    setUser && setUser(data as FullUserData)
    onSuccess && onSuccess()
  } })

  const onSubmit = async (loginData: Object, e?: any) => {
    e?.preventDefault();
    
    mutate(loginData as userData);

    console.log("accessToken:", data)
  }

  const onRegistration = () => {
    setModal({
      name: 'registration',
      props: {
        onClose: () => {
        },
        onSuccess: () => {
        },
      },
    })
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
            required
            className="w-full overflow-hidden rounded-xsmall"
            inputClassName="rounded-xsmall overflow-hidden my-3 py-1"
          />

          <button className="w-full bg-slate-700 text-white py-4 mt-5 hover:bg-slate-600 transition-colors duration-300" 
            disabled={ isLoading }
          >
            Авторизуватися
          </button>

          <div className="w-full text-center bg-yellow-300 text-slate-800 py-4 mt-5 hover:cursor-pointer hover:bg-yellow-400 transition-colors duration-300" 
            onClick={ onRegistration }
          >
            Реєстрація
          </div>
        </form>
      </div>
    </BaseModal>
  )
}

export default LoginModal
