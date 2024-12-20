export const APP_ROUTES_PATH = {
	attestations: 'attestations',
	students: 'students',
	teachers: 'teachers',
	groups: 'groups',
	subjects: 'subjects',
	login: 'login',
	settings: 'settings',
	profile: 'profile',
	logs: 'logs',
};

export const APP_ROUTES = [
	{ path: APP_ROUTES_PATH.attestations, title: 'Аттестации' },
	{ path: APP_ROUTES_PATH.students, title: 'Студенты' },
	{ path: APP_ROUTES_PATH.teachers, title: 'Преподаватели' },
	{ path: APP_ROUTES_PATH.groups, title: 'Группы' },
	{ path: APP_ROUTES_PATH.subjects, title: 'Дисциплины' },
	{ path: APP_ROUTES_PATH.logs, title: 'Журнал событий' },
	{ path: APP_ROUTES_PATH.settings, title: 'Настройки' },
	{ path: APP_ROUTES_PATH.profile, title: 'Профиль' },
];

export const LIST_SIZE = 10;
