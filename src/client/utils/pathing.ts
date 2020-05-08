
export const getPathText = (pathname: string): string => {

    if (pathname.includes('/details')) {
        pathname = '/details';
    }

    if (pathname.includes('/edit')) {
        pathname = '/edit';
    }

    switch (pathname) {
        case '/':
            return 'Home';
        case '/new':
            return 'New';
        case '/admin':
            return 'Admin';
        case '/details':
            return 'Blog Details'
        case '/edit':
            return 'Edit'
        case '/login':
                return 'Log In'
        case '/register':
                return 'Register'
        default:
            return '';
    }
}