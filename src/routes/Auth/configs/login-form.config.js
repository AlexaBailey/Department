import * as yup from 'yup';

export const schema = yup.object().shape({
	username: yup
		.string()
		.required('Обязательное поле')
		.min(4, 'Логин не может быть меньше 4 символов')
		.max(36, 'Логин не может быть больше 36 символов'),
	password: yup
		.string()
		.required('Обязательное поле')
		.min(4, 'Пароль не может быть меньше 4 символов')
		.max(36, 'Пароль не может быть больше 36 символов'),
});
