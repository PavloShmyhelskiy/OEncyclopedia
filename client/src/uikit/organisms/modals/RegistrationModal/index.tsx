import { useAuth } from '@api/resources/login/AuthContex'
import { NetworkError, registerUser, userData } from '@api/resources/login/login'
import { Input } from '@uikit/molecules'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useModals } from '..'
import { BaseModal, BaseModalProps } from '../components'
import type { FullUserData } from '../LoginModal'

export interface RegModalProps extends BaseModalProps {}

const RegistrationModal = ({
  header,
  visible,
  onClose,
  onSuccess,
}: RegModalProps ) => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const { setUser } = useAuth();
  const { setModal } = useModals();
  
  const { mutate, isError, error, isLoading } = useMutation(registerUser, { onSuccess: (data) => {

    const user : FullUserData = {
      isAdmin: false,
      username: data?.username!,
      email: "", 
      accessToken: "",
    }

    setUser && setUser(user as FullUserData)
    onSuccess && onSuccess()
    setModal({
        name: 'login',
        props: {
          onClose: () => {
            // console.log("on close");
          },
          onSuccess: () => {
            console.log("user reg success", data)
            console.log("reg on success");
          },
          emailValue: data?.email,
        },
      }
    )
  } })

  const onSubmit = async (regData: Object, e?: any) => {
    e?.preventDefault();

    var user = regData as userData & {passwordConfirmation: string};

  console.log(user)

    if (user.passwordConfirmation !== user.password) {
      setError("passwordConfirmation", { type: "custom", message: "Паролі не збігаються" } )
      console.log("Паролі не збігаються")
      
      return;
    }
    mutate(regData as userData);
  }

  const labelStyle = "mt-[20px] text-xl";
  const errorClass = "mb-[10px] text-center text-xl text-red-600";

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
          Реєстрація
        </h3>

        {isError && error instanceof NetworkError 
          ? <p className={ errorClass }>{ error.message }</p> 
          : isError && <p className={ errorClass }>{ "Пошта вже використовується" }</p> }
        {errors['passwordConfirmation'] && <p className={ errorClass }>{ errors.passwordConfirmation.message }</p> }

        <form id="login-form" 
          onSubmit={handleSubmit(onSubmit)}
        >

          <p className={labelStyle}>Ім'я</p>
          <Input
            name="username"
            type="text"
            control={control}
            required
            className="w-full overflow-hidden rounded-xsmall"
            inputClassName="rounded-xsmall overflow-hidden my-3 py-1"
          />

          <p className={labelStyle}>Електронна пошта</p>
          <Input
            name="email"
            type="email"
            required
            control={control}
            className="w-full overflow-hidden rounded-xsmall none"
            inputClassName="rounded-xsmall overflow-hidden my-3 py-1"
          />

          <p className={labelStyle}>Пароль</p>
          <Input
            name="password"
            type="password"
            required
            control={control}
            className="w-full overflow-hidden rounded-xsmall"
            inputClassName="rounded-xsmall overflow-hidden my-3 py-1"
          />

          <p className={labelStyle}>Підтвердження пароля</p>
          <Input
            name="passwordConfirmation"
            type="password"
            required
            control={control}
            className="w-full overflow-hidden rounded-xsmall"
            inputClassName="rounded-xsmall overflow-hidden my-3 py-1"
          />

          <button className="w-full bg-slate-700 text-white py-4 mt-5 hover:bg-slate-600 transition-colors duration-300" 
            disabled={ isLoading }
          >
            Зареєструватися
          </button>

        </form>
      </div>
    </BaseModal>
  )
}

export default RegistrationModal
