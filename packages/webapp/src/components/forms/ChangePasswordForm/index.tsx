/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import styles from './index.module.scss'
import type ComponentProps from '~types/ComponentProps'
import { Formik, Form } from 'formik'
import FormikField from '~ui/FormikField'
import FormSectionTitle from '~components/ui/FormSectionTitle'
import * as yup from 'yup'
import { Row, Col } from 'react-bootstrap'
import cx from 'classnames'
import { useTranslation } from '~hooks/useTranslation'

interface ChangePasswordFormProps extends ComponentProps {
	submitMessage: string
	changePasswordClick?: (newPassword: string) => void
	goBackToLoginClick?: () => void
}

const ChangePasswordForm = memo(function ChangePasswordForm({
	submitMessage,
	changePasswordClick,
	goBackToLoginClick
}: ChangePasswordFormProps): JSX.Element {
	const { t } = useTranslation('passwordReset')
	const ValidPasswordResetValidationSchema = yup.object().shape({
		newPassword: yup
			.string()
			.required(t('changePasswordForm.yup.required'))
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
				t('changePasswordForm.yup.passwordComplexity')
			),
		confirmNewPassword: yup
			.string()
			.required(t('changePasswordForm.yup.required'))
			.oneOf([yup.ref('newPassword'), null], t('changePasswordForm.yup.matchPassword'))
	})

	return (
		<Row>
			<Formik
				validateOnMount={false}
				initialValues={{ newPassword: '', confirmNewPassword: '' }}
				validationSchema={ValidPasswordResetValidationSchema}
				onSubmit={values => changePasswordClick?.(values.newPassword)}
			>
				{({ submitCount, values, errors }) => {
					return submitCount > 0 && submitMessage === null ? (
						<Col>
							<Row>
								<h2>{t('changePasswordForm.changePasswordSuccess.text')}</h2>
								<p className='mb-5 mt-3'>
									{t('changePasswordForm.changePasswordSuccess.description')}
								</p>
							</Row>
							<Row>
								<div>
									<button
										type='button'
										className={styles.resetPasswordButton}
										onClick={() => goBackToLoginClick?.()}
									>
										{t('changePasswordForm.goBackButton.text')}
									</button>
								</div>
							</Row>
						</Col>
					) : (
						<Col>
							<Row>
								<h2>{t('changePasswordForm.title')}</h2>
								<p className={cx('mb-5 mt-3', styles.description)}>
									{t('changePasswordForm.description')}
								</p>
							</Row>
							<Form>
								<FormSectionTitle className='mb-3'>
									<>
										{t('changePasswordForm.newPassword.text')}{' '}
										<span className='text-danger'>*</span>
									</>
								</FormSectionTitle>
								<FormikField
									name='newPassword'
									type='password'
									placeholder={t('changePasswordForm.newPassword.placeholder')}
									className={styles.formField}
									error={errors.newPassword}
									errorClassName={cx(styles.errorLabel)}
								/>
								<FormSectionTitle className='mt-5 mb-3'>
									<>
										{t('changePasswordForm.confirmPassword.text')}{' '}
										<span className='text-danger'>*</span>
									</>
								</FormSectionTitle>
								<FormikField
									name='confirmNewPassword'
									type='password'
									placeholder={t('changePasswordForm.confirmPassword.placeholder')}
									className={styles.formField}
									error={errors.confirmNewPassword}
									errorClassName={styles.errorLabel}
								/>
								{submitMessage && (
									<div className={cx('mb-5 alert alert-danger')}>{submitMessage}</div>
								)}
								<button
									type='submit'
									className={cx('mt-5', styles.resetPasswordButton)}
									disabled={
										!values?.newPassword ||
										!!errors?.newPassword ||
										!values?.confirmNewPassword ||
										!!errors?.confirmNewPassword
									}
								>
									{t('changePasswordForm.changePasswordButton.text')}
								</button>
							</Form>
						</Col>
					)
				}}
			</Formik>
		</Row>
	)
})
export default ChangePasswordForm