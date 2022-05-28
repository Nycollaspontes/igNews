import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}
// Pego todo as props children, activeclassname e todas as outras props dos  atributos de Link.
export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {

    const { asPath } = useRouter()

    const className = asPath === rest.href
        ? activeClassName
        : '';



    return (
        <Link href={""} {...rest}>
            {cloneElement(children, {
                className
            })}
        </Link>
    );
}