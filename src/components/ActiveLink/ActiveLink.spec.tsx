import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

test('active link renders correctly', () => {
    render(
        <ActiveLink href='/' activeClassName='active' >
            <a>Home</a>
        </ActiveLink>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
})
// 
test('active link is receiving active link', () => {
    const { getByText } = render(
        <ActiveLink href='/' activeClassName='active' >
            <a>Home</a>
        </ActiveLink>
    )
    expect(getByText('Home')).toHaveClass('active')
})