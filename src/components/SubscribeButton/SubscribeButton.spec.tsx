import { fireEvent, render, screen } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { SubscribeButton } from './'
import { useRouter } from 'next/router'

jest.mock('next-auth/react')

jest.mock('next/router')



describe('SubscribeButton Component', () => {
    it('renders correctly ', () => {
        const useSessionMocked = jest.mocked(useSession);

        useSessionMocked.mockReturnValueOnce({
            data : null ,
            status :'unauthenticated',
        });

        render(<SubscribeButton />)

        expect(screen.getByText('View Posts')).toBeInTheDocument()
    });

    it('redirect user to signIn when not authenticated', () => {
        const useSessionMocked = jest.mocked(useSession)
        const signInMocked = jest.mocked(signIn)

        useSessionMocked.mockReturnValueOnce({
            data : null ,
            status : 'loading',
        })

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('View Posts')

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to posts when user already has a subscription', () => {
        const useRouterMocked = jest.mocked(useRouter);
        const useSessionMocked = jest.mocked(useSession);
        const pushMock = jest.fn()

        useSessionMocked.mockReturnValueOnce({
            data: {
                user: {

                    name: "Nycollas Pontes",
                    email: "nycollas.pontes@example.com"
                },
                activeSubscription: 'fake-active-subscription',
                expires: "fake-expires",
            },
            status: "authenticated",
        }) as any;


        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any);

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('View Posts')

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalledWith('/posts')
    })
})