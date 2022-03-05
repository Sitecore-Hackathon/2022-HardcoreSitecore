import React from 'react';
import Link from 'next/link';
// import { useI18n } from 'next-localization';
import {
    getPublicUrl,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useOcDispatch, useOcSelector } from './ordercloud/redux/ocStore'
import logout from './ordercloud/redux/ocAuth/logout'

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

// This is boilerplate navigation for sample purposes. Most apps should throw this away and use their own navigation implementation.
// Most apps may also wish to use GraphQL for their navigation construction; this sample does not simply to support disconnected mode.
export default function Navigation () {
    // const { t } = useI18n();
    const dispatch = useOcDispatch()
    const { user, isAnonymous, loading, lineItemCount } = useOcSelector((s) => ({
        user: s.ocUser.user,
        loading: s.ocAuth.loading,
        isAnonymous: s.ocAuth.isAnonymous,
        lineItemCount: s.ocCurrentOrder.order ? s.ocCurrentOrder.order.LineItemCount : 0,
    }))

    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <Link href="/">
                    <a className="text-dark">
                        <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
                        <span className="logo-text">Hardcore!</span>
                    </a>
                </Link>
            </h5>
            <nav className="my-2 my-md-0 mr-md-3 navlinks">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/cart">
                    <a>Cart</a>
                </Link>
                <Link href="/products">
                    <a>Products</a>
                </Link>
                {isAnonymous ? (
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                ) : (
                    <button type="button" disabled={loading} onClick={() => dispatch(logout())}>
                        Logout
                    </button>
                )}
                {!isAnonymous && user && <p>{`${user.FirstName} ${user.LastName}`}</p>}
            </nav>
        </div>
    );
};