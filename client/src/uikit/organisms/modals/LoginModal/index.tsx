import { BaseModal, BaseModalProps } from '../components'

export interface LoginModalProps extends BaseModalProps {}

const LoginModal = ({
  header,
  visible,
  onClose,
}: LoginModalProps) => {
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
          fsdfsdf
        </h3>

        <p className="mb-10 text-center text-sm text-ultra-dark-grey">fsdfs</p>

        {/* <form id="login-form" onSubmit={onSubmit}>
          <Input
            name="phone"
            control={control}
            Icon={
              successField(watchPhone, PHONE_REGEXP) &&
              !getFieldState('phone').error ? (
                <CheckmarkIcon className="fill-pink" />
              ) : undefined
            }
            placeholder={getCountryCode() === 'MA' ? '+212' : '+351'}
            mask={PHONE_MASK_REGEXP}
            className="w-full overflow-hidden rounded-xsmall"
            inputClassName="rounded-xsmall overflow-hidden"
          />

          {currentStep === 1 && (
            <Input
              name="code"
              control={control}
              placeholder={t('ui.modals.login.form.code.placeholder')}
              Icon={
                watchCode?.length === 5 && !getFieldState('code').error ? (
                  <CheckmarkIcon className="fill-pink" />
                ) : undefined
              }
              maxLength={5}
              className="mt-3 overflow-hidden rounded-xsmall"
              inputClassName="rounded-xsmall overflow-hidden"
            />
          )}
        </form> */}
      </div>
    </BaseModal>
  )
}

export default LoginModal
